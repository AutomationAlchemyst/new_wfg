import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './UIComponents';
import gsap from 'gsap';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Toggle state
  const toggleWidget = () => setIsOpen(!isOpen);

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(widgetRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Hover animation for the main button
  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
  };
  
  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* --- Chat Window (Glassmorphism) --- */}
      {isOpen && (
        <div 
          ref={widgetRef}
          className="w-[350px] bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden origin-bottom-right"
        >
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                 <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-slate-900 text-sm">WorkFlowGuys Support</h4>
                <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Typically replies in &lt;5m
                </p>
              </div>
            </div>
            <button 
              onClick={toggleWidget}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 bg-slate-50/50 min-h-[150px] flex flex-col gap-3">
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 shadow-sm max-w-[85%]">
              Hello! 👋 Ready to automate the boring stuff?
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 shadow-sm max-w-[85%] delay-100">
              Click below to start a WhatsApp chat with our engineering team directly.
            </div>
          </div>

          {/* Footer / Action */}
          <div className="p-4 bg-white border-t border-slate-100">
            <a 
              href="https://wa.me/6583215730"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-medium transition-colors shadow-lg shadow-green-500/20"
            >
              Start Chat <Send size={16} />
            </a>
            <div className="text-center mt-2">
               <span className="text-[10px] text-slate-400">Powered by Unipile</span>
            </div>
          </div>
        </div>
      )}

      {/* --- Floating Toggle Button --- */}
      <button
        ref={buttonRef}
        onClick={toggleWidget}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-16 h-16 rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/40 flex items-center justify-center overflow-hidden transition-all hover:shadow-slate-900/60"
      >
         {/* Ping Animation */}
         <span className="absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-20 animate-ping duration-[2s]"></span>
         
         {/* Icon */}
         <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
           {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
         </div>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
