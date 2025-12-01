import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- LIVING BLUEPRINT SHADERS ---

const vertexShader = `
  uniform float uTime;
  uniform float uScroll;     // 0 = Top, 1 = Bottom
  uniform float uScrollVel;  // Velocity of scroll for "warp" effect
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying float vElevation;

  // Simplex Noise (for organic ripples)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // 1. Grid Movement
    // The grid moves "forward" constantly, plus scroll influence
    float moveSpeed = uTime * 0.1 + uScroll * 2.0;
    
    // 2. Elevation Logic
    
    // A. Base Rolling Hills (Low frequency)
    float terrain = snoise(vec2(pos.x * 0.2, pos.y * 0.2 - moveSpeed)) * 1.5;
    
    // B. Interaction Ripple (Mouse)
    // Map mouse -1 to 1 space to world space approx
    vec2 mouseWorld = (uMouse - 0.5) * 20.0; 
    float dist = distance(pos.xy, mouseWorld);
    float mouseInteract = smoothstep(5.0, 0.0, dist) * -2.0; // Push down
    
    // C. Velocity Warp (The faster you scroll, the more it stretches)
    float velocityWarp = snoise(vec2(pos.x * 1.0, pos.y * 0.5 - uTime)) * uScrollVel * 2.0;

    pos.z += terrain + mouseInteract + velocityWarp;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uThemeColor; // New Uniform
  uniform float uThemeStrength; // 0 = Default, 1 = Theme Active
  
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // --- GRID LOGIC ---
    // We create a grid pattern procedurally
    float gridScale = 30.0; // Larger squares for better visibility
    
    vec2 grid = abs(fract(vUv * gridScale - 0.5) - 0.5) / fwidth(vUv * gridScale);
    float line = min(grid.x, grid.y);
    
    // Anti-aliased thicker lines
    // We multiply line by 0.5 to make the "gap" smaller -> thicker lines
    float alpha = 1.0 - min(line * 0.8, 1.0);
    
    // Color: Darker Blueprint Blue
    vec3 baseColor = vec3(0.05, 0.1, 0.4); // Much darker blue
    
    // Mix in the Theme Color (Amber or Cyan)
    vec3 lineColor = mix(baseColor, uThemeColor, uThemeStrength);
    
    // Elevation Coloring
    // Peaks get slightly lighter
    lineColor = mix(lineColor, vec3(0.0, 0.4, 0.8), smoothstep(-1.0, 3.0, vElevation));

    // --- CURSOR HALO (New) ---
    // Map uMouse (0-1) to UV space for distance calc
    float mouseDist = distance(vUv, uMouse);
    
    // Create a glow radius (approx 0.15 of screen width)
    float mouseGlow = smoothstep(0.15, 0.0, mouseDist);
    
    // Brand Yellow / Warm Gold for the "Human Spark"
    vec3 glowColor = vec3(1.0, 0.8, 0.2); 
    
    // Mix the yellow into the blue lines based on proximity
    lineColor = mix(lineColor, glowColor, mouseGlow * 0.8); // 80% strength at center

    // Distance Fade (Fog)
    // We use a radial gradient from center to fade edges
    float dist = distance(vUv, vec2(0.5));
    float alphaFade = smoothstep(0.5, 0.1, dist); // Tighter fade

    // Boost opacity significantly
    gl_FragColor = vec4(lineColor, alpha * alphaFade * 0.8); 
  }
`;

interface Experience3DProps {
  activeTheme?: 'left' | 'right' | null;
}

const Experience3D: React.FC<Experience3DProps> = ({ activeTheme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // --- THEME ANIMATION LOGIC ---
  useEffect(() => {
    if (!materialRef.current) return;

    let targetColor = new THREE.Color(0.05, 0.1, 0.4); // Default Blue
    let strength = 0;

    if (activeTheme === 'left') {
      // Visionary (Ath) -> Warm Amber
      targetColor = new THREE.Color(1.0, 0.6, 0.2); 
      strength = 1;
    } else if (activeTheme === 'right') {
      // Architect (Hafiz) -> Cool Cyan
      targetColor = new THREE.Color(0.0, 0.9, 1.0);
      strength = 1;
    }

    gsap.to(materialRef.current.uniforms.uThemeColor.value, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 1.5,
      ease: "power2.out"
    });

    gsap.to(materialRef.current.uniforms.uThemeStrength, {
      value: strength,
      duration: 1.5,
      ease: "power2.out"
    });

  }, [activeTheme]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP ---
    const scene = new THREE.Scene();
    
    // Camera is tilted to look at the "floor"
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // Moved camera closer and lower for more drama
    camera.position.set(0, -4, 3); 
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- PLANE GEOMETRY ---
    // Large plane, lots of segments for smooth waves
    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uScrollVel: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uThemeColor: { value: new THREE.Color(0.05, 0.1, 0.4) }, // Init default
        uThemeStrength: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      // wireframe: true // Uncomment to debug mesh
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    // Rotate to be a "floor"
    // Actually, keeping it facing camera slightly tilted is better for this effect
    // Our camera setup handles the angle.
    scene.add(mesh);

    // --- ANIMATION ---
    const clock = new THREE.Clock();
    let lastScrollY = window.scrollY;

    const animate = () => {
      const time = clock.getElapsedTime();
      
      // Calculate Scroll Velocity
      const currentScrollY = window.scrollY;
      const velocity = (currentScrollY - lastScrollY) * 0.001;
      lastScrollY = currentScrollY;

      // Smoothly dampen velocity uniform
      if (materialRef.current) {
         materialRef.current.uniforms.uTime.value = time;
         
         // Lerp velocity back to 0
         materialRef.current.uniforms.uScrollVel.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uScrollVel.value,
            velocity,
            0.1
         );
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // --- SCROLL SYNC ---
    // We map page scroll 0-1 to shader
    const handleScroll = () => {
       const maxScroll = document.body.scrollHeight - window.innerHeight;
       const scroll = window.scrollY / maxScroll;
       if(materialRef.current) {
          materialRef.current.uniforms.uScroll.value = scroll;
       }
    };
    window.addEventListener('scroll', handleScroll);

    // --- MOUSE SYNC ---
    const handleMouseMove = (e: MouseEvent) => {
      if(materialRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - (e.clientY / window.innerHeight); // Flip Y for Three.js
        gsap.to(materialRef.current.uniforms.uMouse.value, {
          x: x,
          y: y,
          duration: 0.5
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- RESIZE ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }} 
    />
  );
};

export default Experience3D;
