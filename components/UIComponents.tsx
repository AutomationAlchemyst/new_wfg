import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const baseStyles = "relative px-8 py-4 rounded-full font-sans font-medium text-sm transition-all duration-300 ease-out overflow-hidden group";
  
  const variants = {
    // Gradient Glow Button (Light Mode: Dark bg with glow)
    primary: "bg-slate-900 text-white hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105",
    // Glass Button (Light Mode: White glass)
    secondary: "bg-white/80 border border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 backdrop-blur-md",
    // Brand Glow
    glow: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(217,119,6,0.5)]"
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Magnetic Pull Strength
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <button 
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">{children}</span>
      {/* Shine effect (Darker for light mode visibility) */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max +/- 10 degrees)
    // xPct goes from -1 to 1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    setRotation({
      x: -yPct * 8, // Rotate X based on Y mouse movement (tilt up/down)
      y: xPct * 8   // Rotate Y based on X mouse movement (tilt left/right)
    });

    // Calculate glare position (inverse)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    // Light Mode Card: White glass with subtle gray border
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={`glass-panel relative rounded-3xl p-8 hover:bg-white/80 transition-colors duration-500 border border-slate-200 group ${className} overflow-hidden`}
    >
      {/* Dynamic Glare Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`,
          opacity: glare.opacity
        }}
      />
      
      <div className="relative z-10">
        {title && <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export const RevealText: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
      {children}
    </div>
  );
};

// New DecryptText Component
export const DecryptText: React.FC<{ text: string; className?: string; speed?: number }> = ({ text, className = "", speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3; // Slow down the resolution
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, text, speed]);

  return (
    <span ref={containerRef} className={`font-mono ${className}`}>
      {displayedText}
    </span>
  );
};