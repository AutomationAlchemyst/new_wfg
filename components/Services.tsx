import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { Card, DecryptText } from './UIComponents';
import { SITE_CONTENT } from '../content';

// --- Velocity Timer Component ---
const VelocityTimer = () => {
    const [ms, setMs] = useState(0);
    const [status, setStatus] = useState('IDLE');

    useEffect(() => {
        let interval: any;

        const runCycle = () => {
            setStatus('RUNNING');
            setMs(0);
            const startTime = Date.now();

            interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                if (elapsed >= 495) {
                    setMs(495);
                    setStatus('DONE');
                    clearInterval(interval);
                    setTimeout(runCycle, 2000); // Pause before restarting
                } else {
                    setMs(elapsed);
                }
            }, 10);
        };

        runCycle();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'RUNNING' ? 'bg-accent-secondary animate-pulse' : 'bg-green-500'}`}></span>
                {status === 'RUNNING' ? 'PROCESSING...' : 'COMPLETE'}
            </div>
            <div className="font-mono text-5xl font-bold text-accent-primary tabular-nums tracking-tighter">
                {ms}<span className="text-sm opacity-50 ml-1 text-slate-500 font-sans font-medium">ms</span>
            </div>
        </div>
    );
};

interface ServicesProps {
    servicesRef: React.RefObject<HTMLElement>;
    hoursSaved: number;
}

export const Services: React.FC<ServicesProps> = ({ servicesRef, hoursSaved }) => {
    const { services, stats } = SITE_CONTENT;

    return (
        <>
            {/* --- Stats Ticker (Floating) --- */}
            <div className="relative z-20 -mt-20 mb-20 pointer-events-none px-4">
                <div className="max-w-4xl mx-auto glass-panel rounded-full py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto bg-[#0A0B1E]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-accent-primary" />
                        <span className="text-sm font-medium text-slate-400">
                            <DecryptText text={stats.label} speed={20} />
                        </span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white tabular-nums tracking-tight text-glow">
                        {hoursSaved.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-accent-secondary">
                        <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></span>
                        Live Real-time
                    </div>
                </div>
            </div>

            {/* --- Services (Bento Grid) --- */}
            <section id="services" ref={servicesRef} className="relative py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto z-10">
                <div className="mb-16 md:mb-24 text-center service-card">
                    <h2 className="font-display kinetic-title text-4xl md:text-7xl font-bold tracking-tight mb-6 text-white">{services.title}</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">{services.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[minmax(300px,auto)]">
                    {services.items.map((item) => (
                        <Card
                            key={item.id}
                            className={`service-card ${item.className || ''} group relative overflow-hidden !bg-white/5 !border-white/5 hover:!border-accent-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]`}
                            title={item.title}
                        >
                            {item.id === 'core-intelligence' && (
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            )}

                            <div className="relative z-10 h-full flex flex-col justify-between p-2">
                                {item.showTimer ? (
                                    <div className="h-full flex flex-col items-center text-center justify-center space-y-8">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-accent-secondary/10 to-accent-primary/10 flex items-center justify-center shadow-inner shadow-white/5 group-hover:scale-110 transition-transform duration-500">
                                            <item.icon className="w-10 h-10 text-accent-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-2xl font-bold text-white mb-2">{item.subtitle}</h3>
                                            <p className="text-slate-400 text-sm">{item.description}</p>
                                        </div>
                                        <div className="w-full h-px bg-white/5 my-4"></div>
                                        <VelocityTimer />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            {item.id !== 'core-intelligence' && (
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-primary/20 transition-colors duration-300">
                                                    <item.icon className="w-6 h-6 text-white group-hover:text-accent-primary transition-colors" />
                                                </div>
                                            )}
                                            <h3 className={`font-display ${item.id === 'core-intelligence' ? 'text-4xl' : 'text-2xl'} font-bold mb-3 text-white group-hover:text-accent-primary transition-colors duration-300`}>
                                                {item.subtitle}
                                            </h3>
                                            <p className={`text-slate-400 ${item.id === 'core-intelligence' ? 'text-lg max-w-md' : 'text-sm'} leading-relaxed`}>
                                                {item.description}
                                            </p>
                                        </div>
                                        {item.tags && (
                                            <div className="flex gap-3 mt-8">
                                                {item.tags.map(tag => (
                                                    <div key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium tracking-wide">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            {item.id === 'core-intelligence' && (
                                <item.icon className="absolute -bottom-12 -right-12 w-64 h-64 text-white/5 group-hover:text-accent-primary/5 transition-colors duration-500 rotate-12" />
                            )}
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
};
