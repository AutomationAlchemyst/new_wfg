import React from 'react';
import { SITE_CONTENT } from '../content';

export const Process: React.FC = () => {
    const { process } = SITE_CONTENT;

    return (
        <section id="process" className="py-20 md:py-32 px-4 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        {process.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto rounded-full opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10"></div>

                    {process.steps.map((step, i) => (
                        <div key={step.id} className="relative group">
                            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-accent-primary/30 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center group-hover:bg-white/10">
                                <div className="w-20 h-20 rounded-2xl bg-[#0A0B1E] border border-white/10 text-white flex items-center justify-center mb-8 group-hover:bg-accent-primary group-hover:text-white transition-all duration-500 shadow-xl relative z-10">
                                    <step.icon size={32} className="group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#030014] flex items-center justify-center text-sm font-mono font-bold text-slate-500 border border-white/10 group-hover:border-accent-primary group-hover:text-accent-primary transition-colors duration-500">
                                    0{i + 1}
                                </div>
                                <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-accent-primary transition-colors duration-300">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
