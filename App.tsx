import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Mail, Menu, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience3D from './components/DitherShader';
import ContactSection from './components/ContactSection';
import { Button } from './components/UIComponents';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { ROICalculator } from './components/ROICalculator';
import { Testimonials } from './components/Testimonials';
import { CaseStudy } from './components/CaseStudy';
import { Philosophy } from './components/Philosophy';
import { FAQ } from './components/FAQ';
import wfgLogo from './assets/wfglogo.jpg';
import { SITE_CONTENT } from './content';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

// --- Branding ---
const WFGLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src={wfgLogo} alt="WorkFlowGuys Logo" className={`${className} object-contain rounded-sm`} />
);

// --- App ---
export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [hoursSaved, setHoursSaved] = useState(SITE_CONTENT.stats.initialValue);
  const [philosophyHover, setPhilosophyHover] = useState<'left' | 'right' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation Refs
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (loading) return; // Wait for loading to finish

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
  }, [loading]);

  // Ticker Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setHoursSaved(prev => prev + 1);
    }, SITE_CONTENT.stats.updateInterval);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations Setup
  useEffect(() => {
    if (loading) return;

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
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Philosophy Reveal
      if (philosophyRef.current) {
        gsap.from(philosophyRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 70%",
          }
        });
      }

      // Kinetic Typography Animations
      const titles = document.querySelectorAll('.kinetic-title');
      titles.forEach(title => {
        gsap.fromTo(title,
          { y: 100, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 90%",
              end: "top 50%",
              scrub: false,
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    });

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="relative w-full min-h-screen bg-void text-white selection:bg-accent-primary selection:text-white">
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Global Grain Overlay */}
      <div className="noise-overlay"></div>

      {/* 3D Background */}
      <Experience3D activeTheme={philosophyHover} />

      {/* --- Header --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-void/50 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3 relative z-50">
          <WFGLogo className="w-8 h-8" />
          <span className="font-display font-semibold tracking-tight text-lg text-white">WorkFlowGuys</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#roi" className="hover:text-white transition-colors">ROI</a>
          <a href="#case-study" className="hover:text-white transition-colors">Case Study</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Team</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <a href="#audit" className="hidden md:block">
          <Button variant="secondary" className="!px-6 !py-2 !text-xs !bg-white/5 !border-white/10 !text-white hover:!bg-white/10">
            Audit Access
          </Button>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#030014] z-[60] flex flex-col items-center justify-start pt-32 pb-12 gap-6 overflow-y-auto transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-all duration-300"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        {[
          { href: "#services", label: "Services" },
          { href: "#process", label: "Process" },
          { href: "#roi", label: "ROI" },
          { href: "#case-study", label: "Case Study" },
          { href: "#philosophy", label: "Team" },
          { href: "#faq", label: "FAQ" }
        ].map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`text-2xl font-display font-bold text-white hover:text-accent-primary transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${index * 50 + 100}ms` }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#audit"
          onClick={() => setIsMenuOpen(false)}
          className={`mt-4 transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: '450ms' }}
        >
          <Button variant="glow" className="!px-10 !py-4 !text-xl">
            Audit Access
          </Button>
        </a>
      </div>

      <main id="main-content">
        <Hero heroRef={heroRef} />

        <Services servicesRef={servicesRef} hoursSaved={hoursSaved} />

        <Process />

        <ROICalculator />

        <Testimonials />

        <CaseStudy />

        <Philosophy
          philosophyRef={philosophyRef}
          philosophyHover={philosophyHover}
          setPhilosophyHover={setPhilosophyHover}
        />

        <FAQ />

        {/* --- Contact / Audit Section --- */}
        <ContactSection />
      </main>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-white/10 bg-void z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <WFGLogo className="w-6 h-6 grayscale" />
            <span className="text-xs font-medium text-slate-400">WORKFLOWGUYS LLP &copy; 2024. All rights reserved. UEN T25LL0792A</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500 items-center">
            <a href="https://www.instagram.com/theworkflowguys?igsh=MTRvYm81dnF6MHUxNQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/17nL9CxAmq/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://wa.me/6583215730?text=Hi%20WorkFlowGuys%2C%20i%20want%20to%20know%20more" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </a>
            <a href="mailto:contact@theworkflowguys.com" className="hover:text-accent-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div >
  );
}