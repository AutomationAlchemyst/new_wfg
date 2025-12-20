import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out container
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 10;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (progress >= 100) {
            // Animate text out
            gsap.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                delay: 0.2
            });
            // Animate progress bar out
            gsap.to(progressRef.current, {
                width: '100%',
                opacity: 0,
                duration: 0.5
            });
        }
    }, [progress]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[10000] bg-[#030014] flex flex-col items-center justify-center text-white">
            <div ref={textRef} className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                <span className="inline-block overflow-hidden">
                    <span className="inline-block animate-pulse">WorkFlowGuys</span>
                </span>
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <div
                    ref={progressRef}
                    className="h-full bg-accent-primary transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-4 font-mono text-xs text-slate-500">
                INITIALIZING SYSTEM... {Math.round(progress)}%
            </div>
        </div>
    );
};
