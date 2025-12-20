import React from 'react';
import { Activity, ExternalLink } from 'lucide-react';
import { Button } from './UIComponents';
import { SITE_CONTENT } from '../content';

export const CaseStudy: React.FC = () => {
    const { caseStudy } = SITE_CONTENT;

    return (
        <section id="case-study" className="py-20 md:py-32 px-4 md:px-12 relative z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 space-y-8 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        {caseStudy.badge}
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        {caseStudy.title}<span className="text-accent-primary text-glow">{caseStudy.accent}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
                        {caseStudy.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                        {caseStudy.stats.map(stat => (
                            <div key={stat.label} className="space-y-1">
                                <div className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <a href={caseStudy.link}>
                            <Button variant="glow" className="group !px-8 !py-4 !text-lg">
                                {caseStudy.cta} <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full order-1 lg:order-2">
                    <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                        {/* Background Image with Overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url('${caseStudy.image}')` }}
                            role="img"
                            aria-label={`Case study preview for ${caseStudy.title}`}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-60"></div>

                        {/* Floating UI Element - Repositioned to Top Right */}
                        <div className="absolute top-8 right-8 w-64 glass-panel p-5 rounded-2xl border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 z-20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner shadow-white/10">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-white uppercase tracking-wider">Performance</div>
                                    <div className="text-[8px] text-slate-400 uppercase tracking-tight">Real-time Active</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                    <span>Efficiency</span>
                                    <span className="text-accent-primary">98.4%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full w-[98.4%] bg-gradient-to-r from-accent-primary to-accent-secondary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
