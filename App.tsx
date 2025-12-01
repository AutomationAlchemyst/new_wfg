import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience3D from './components/DitherShader';
import { Button, Card, RevealText, DecryptText } from './components/UIComponents';
import { ArrowRight, Play, Activity, Layers, Cpu, Zap, Lock, Mouse } from 'lucide-react';
import wfgLogo from './assets/wfglogo.jpg';

gsap.registerPlugin(ScrollTrigger);

// --- Branding ---
const WFGLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src={wfgLogo} alt="WorkFlowGuys Logo" className={`${className} object-contain rounded-sm`} />
);

// --- App ---
export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [hoursSaved, setHoursSaved] = useState(1775);
  const [philosophyHover, setPhilosophyHover] = useState<'left' | 'right' | null>(null);

  // Animation Refs
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // 2. Connect Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  // Ticker Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setHoursSaved(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Hero Parallax
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelectorAll('.hero-anim'), {
          y: -150,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Services Stagger Reveal
      if (servicesRef.current) {
        gsap.from(servicesRef.current.querySelectorAll('.service-card'), {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%", // Start when top of section hits 80% of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen selection:bg-accent-primary selection:text-white">
      {/* Global Grain Overlay */}
      <div className="noise-overlay"></div>
      
      {/* 3D Background */}
      <Experience3D />
      
      {/* --- Header --- */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel-heavy px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <WFGLogo className="w-8 h-8" />
          <span className="font-semibold tracking-tight text-lg text-slate-900">WorkFlowGuys</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-accent-primary transition-colors">Services</a>
          <a href="#case-study" className="hover:text-accent-primary transition-colors">Case Studies</a>
          <a href="#philosophy" className="hover:text-accent-primary transition-colors">Philosophy</a>
        </div>
        <Button variant="secondary" className="!px-6 !py-2 !text-xs hidden md:flex !text-slate-800 !border-slate-200 hover:!bg-slate-100">
          Audit Access
        </Button>
      </nav>

      {/* --- Hero Section --- */}
      <header ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-10">
        
        {/* Subtle Gradient Glow - Reduced for Grid Visibility */}
        <div className="hero-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-5xl mx-auto space-y-8 pointer-events-none">
          <div className="hero-anim pointer-events-auto">
            <RevealText delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white/60 backdrop-blur-md text-xs font-medium text-accent-primary mb-6 shadow-sm ring-1 ring-slate-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                <DecryptText text="SYSTEM v2.0 ONLINE" />
              </div>
            </RevealText>
          </div>

          <div className="hero-anim">
            <RevealText delay={300}>
              <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter leading-[0.9] text-slate-900 pb-4 mix-blend-multiply">
                Frenzy <span className="text-slate-400 italic font-light">to</span> Focus.
              </h1>
            </RevealText>
          </div>
          
          <div className="hero-anim">
            <RevealText delay={500}>
              <div className="relative inline-block px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm mx-auto max-w-2xl">
                <p className="text-lg md:text-2xl text-slate-800 font-semibold leading-relaxed">
                  We engineer intelligent AI infrastructures that render busywork obsolete.
                </p>
              </div>
            </RevealText>
          </div>

          <div className="hero-anim pointer-events-auto">
            <RevealText delay={700}>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
                <Button variant="primary">
                  Start Transformation <ArrowRight className="w-4 h-4" />
                </Button>
                <span className="text-slate-400 text-sm">or</span>
                <button className="flex items-center gap-3 text-slate-600 hover:text-accent-primary transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-100 transition-all bg-white shadow-sm">
                    <Play className="w-4 h-4 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-medium">Watch Showreel</span>
                </button>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-anim pointer-events-none">
          <RevealText delay={1000}>
            <div className="flex flex-col items-center gap-2 animate-bounce opacity-80">
               <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Scroll to Focus</span>
               <Mouse className="w-6 h-6 text-slate-500" />
            </div>
          </RevealText>
        </div>
      </header>

      {/* --- Stats Ticker (Floating) --- */}
      <div className="relative z-20 -mt-20 mb-20 pointer-events-none px-4">
        <div className="max-w-4xl mx-auto glass-panel rounded-full py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto bg-white/60 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3">
             <Activity className="w-5 h-5 text-accent-primary" />
             <span className="text-sm font-medium text-slate-600">
               <DecryptText text="HOURS AUTOMATING HUMANITY:" speed={20} />
             </span>
          </div>
          <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums tracking-tight">
            {hoursSaved.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-xs text-accent-secondary">
             <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></span>
             Live Real-time
          </div>
        </div>
      </div>

      {/* --- Services (Bento Grid) --- */}
      <section id="services" ref={servicesRef} className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="mb-20 text-center service-card">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-slate-900">The Architecture of Time</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We don't just write scripts. We deploy full-scale intelligent ecosystems designed for scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Large Card */}
          <Card className="service-card md:col-span-2 relative overflow-hidden bg-white/40 border-slate-200" title="Core Intelligence">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                  <h3 className="text-3xl font-semibold mb-4 text-slate-900">Lead Processing Node</h3>
                  <p className="text-slate-600 text-lg max-w-md">Autonomous sorting, qualification, and nurturing of prospects using advanced NLP models. Zero latency.</p>
               </div>
               <div className="flex gap-4 mt-8">
                  <div className="px-4 py-2 rounded-lg bg-white/40 border border-slate-200 text-xs text-slate-600 font-medium">GPT-4o Integration</div>
                  <div className="px-4 py-2 rounded-lg bg-white/40 border border-slate-200 text-xs text-slate-600 font-medium">CRM Sync</div>
               </div>
            </div>
            <Cpu className="absolute bottom-8 right-8 w-32 h-32 text-slate-200" />
          </Card>

          {/* Tall Card */}
          <Card className="service-card md:row-span-2 bg-gradient-to-b from-white/40 to-white/60 border-slate-200" title="Velocity">
             <div className="h-full flex flex-col items-center text-center justify-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center shadow-lg shadow-accent-primary/10">
                   <Zap className="w-10 h-10 text-accent-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Instant Onboarding</h3>
                <p className="text-slate-600 text-sm">Contract to Welcome Email in &lt;500ms. Perfect consistency, every single time.</p>
                <div className="w-full h-px bg-slate-200 my-4"></div>
                <div className="font-mono text-3xl font-bold text-accent-primary">100%</div>
                <div className="text-xs uppercase tracking-widest text-slate-400">Accuracy</div>
             </div>
          </Card>

          {/* Regular Card */}
          <Card className="service-card bg-white/40 border-slate-200" title="Custom Development">
             <Layers className="w-10 h-10 text-slate-800 mb-6" />
             <h3 className="text-xl font-semibold mb-2 text-slate-900">Bespoke App Dev</h3>
             <p className="text-slate-600 text-sm">Full-stack applications wrapped around LLMs to solve niche operational bottlenecks.</p>
          </Card>

          {/* Regular Card */}
          <Card className="service-card bg-white/40 border-slate-200" title="Security">
             <Lock className="w-10 h-10 text-slate-800 mb-6" />
             <h3 className="text-xl font-semibold mb-2 text-slate-900">Enterprise Grade</h3>
             <p className="text-slate-600 text-sm">Bank-level encryption and data handling. Your proprietary data remains yours.</p>
          </Card>
        </div>
      </section>

      {/* --- Case Study (MeatHead) --- */}
      <section id="case-study" className="py-32 px-6 md:px-12 relative z-10 border-t border-slate-200 bg-white/30 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary text-xs font-semibold uppercase tracking-wider">
                  Featured Case Study
               </div>
               <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900">MeatHead<span className="text-accent-primary">.ai</span></h2>
               <p className="text-xl text-slate-600 leading-relaxed">
                  A full-stack Keto ecosystem. We built a custom "Recipe Genie" that dynamically generates meal plans based on user macros and inventory, syncing directly with grocery delivery APIs.
               </p>
               <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                  <div>
                     <div className="text-4xl font-bold text-slate-900 mb-1">400%</div>
                     <div className="text-sm text-slate-500 uppercase tracking-widest">User Growth</div>
                  </div>
                  <div>
                     <div className="text-4xl font-bold text-slate-900 mb-1">&lt;0.5s</div>
                     <div className="text-sm text-slate-500 uppercase tracking-widest">Generation Time</div>
                  </div>
               </div>
               <Button variant="primary" className="mt-4 shadow-lg shadow-slate-200">View Case Study</Button>
            </div>
            
            <div className="flex-1 relative">
               <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-slate-100 to-white border border-slate-200 p-4 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                  {/* Mock UI */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80')] bg-cover opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute bottom-12 left-8 right-8 glass-panel p-6 rounded-2xl animate-float bg-white/80 border-slate-100 shadow-xl">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                           <Activity size={20} />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-900">Macro Analysis</div>
                           <div className="text-xs text-slate-500">Optimized for Ketosis</div>
                        </div>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-green-500"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Philosophy --- */}
      <section id="philosophy" ref={philosophyRef} className="py-40 px-6 relative overflow-hidden text-center z-10">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-secondary/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
         
         <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900">The Dual Core Processor</h2>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
              onMouseLeave={() => setPhilosophyHover(null)}
            >
               <div 
                 onMouseEnter={() => setPhilosophyHover('left')}
                 className={`transition-all duration-500 ${philosophyHover === 'right' ? 'opacity-30 scale-95' : 'opacity-100'}`}
               >
                 <Card className="hover:border-accent-primary/50 transition-colors bg-white/40 border-slate-200 h-full shadow-sm hover:shadow-md">
                    <div className="text-xs font-bold text-accent-primary uppercase tracking-widest mb-4">Visionary</div>
                    <h3 className="text-3xl font-semibold mb-2 text-slate-900">Ath Thaariq</h3>
                    <p className="text-slate-600">The Architect of "Why". Ensuring every automated action serves a distinctly human purpose. Technology is the lever for freedom.</p>
                 </Card>
               </div>
               
               <div 
                 onMouseEnter={() => setPhilosophyHover('right')}
                 className={`transition-all duration-500 ${philosophyHover === 'left' ? 'opacity-30 scale-95' : 'opacity-100'}`}
               >
                 <Card className="hover:border-accent-secondary/50 transition-colors bg-white/40 border-slate-200 h-full shadow-sm hover:shadow-md">
                    <div className="text-xs font-bold text-accent-secondary uppercase tracking-widest mb-4">Architect</div>
                    <h3 className="text-3xl font-semibold mb-2 text-slate-900">Hafiz</h3>
                    <p className="text-slate-600">The Engineer of "How". Building redundant, bulletproof systems. If it breaks, it wasn't automated correctly.</p>
                 </Card>
               </div>
            </div>

            <div className="pt-20 flex justify-center">
               <div className="glass-panel p-10 md:p-14 rounded-[3rem] bg-white/60 backdrop-blur-xl border border-slate-200 shadow-2xl max-w-4xl mx-auto">
                 <p className="text-3xl md:text-5xl font-medium text-slate-900 leading-tight mb-8">
                    "Your business should serve your life,<br /> not the other way around."
                 </p>
                 <Button variant="glow" className="px-12 py-6 text-lg w-full md:w-auto">
                    Book Your Transformation Audit
                 </Button>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white z-10 relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-50">
               <WFGLogo className="w-6 h-6" />
               <span className="text-sm font-medium text-slate-900">WorkFlowGuys &copy; 2024</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
               <a href="#" className="hover:text-accent-primary transition-colors">Twitter</a>
               <a href="#" className="hover:text-accent-primary transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-accent-primary transition-colors">Email</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
