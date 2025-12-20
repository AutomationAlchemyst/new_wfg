import React from 'react';
import { Card, Button } from './UIComponents';
import { SITE_CONTENT } from '../content';

interface PhilosophyProps {
    philosophyRef: React.RefObject<HTMLElement>;
    philosophyHover: 'left' | 'right' | null;
    setPhilosophyHover: (side: 'left' | 'right' | null) => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ philosophyRef, philosophyHover, setPhilosophyHover }) => {
    const { philosophy } = SITE_CONTENT;

    return (
        <section id="philosophy" ref={philosophyRef} className="py-20 md:py-40 px-4 md:px-6 relative overflow-hidden text-center z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[300px] bg-accent-secondary/10 blur-[150px] rounded-full -z-10 pointer-events-none mix-blend-screen"></div>

            <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">{philosophy.title}</h2>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left"
                    onMouseLeave={() => setPhilosophyHover(null)}
                >
                    {philosophy.team.map((member) => (
                        <div
                            key={member.name}
                            onMouseEnter={() => setPhilosophyHover(member.side as 'left' | 'right')}
                            onClick={() => {
                                if (philosophyHover === member.side) {
                                    setPhilosophyHover(null);
                                } else {
                                    setPhilosophyHover(member.side as 'left' | 'right');
                                }
                            }}
                            className={`transition-all duration-700 cursor-pointer ${philosophyHover && philosophyHover !== member.side ? 'opacity-30 scale-95 blur-sm' : 'opacity-100'}`}
                        >
                            <Card className={`group relative overflow-hidden hover:border-accent-${member.side === 'left' ? 'primary' : 'secondary'}/50 transition-all duration-500 !bg-white/5 !border-white/10 h-full shadow-lg hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] p-6 md:p-10`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-${member.side === 'left' ? 'primary' : 'secondary'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="flex flex-col h-full justify-between space-y-8">
                                    <div>
                                        <div className={`text-xs font-bold text-accent-${member.side === 'left' ? 'primary' : 'secondary'} uppercase tracking-[0.2em] mb-6`}>
                                            {member.role}
                                        </div>
                                        <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-glow transition-all duration-300">{member.name}</h3>
                                        <div className="w-12 h-1 bg-white/10 mb-6 group-hover:w-24 group-hover:bg-accent-${member.side === 'left' ? 'primary' : 'secondary'} transition-all duration-500"></div>
                                        <p className="text-slate-400 text-lg leading-relaxed">{member.description}</p>
                                    </div>

                                    {/* Avatar / Image */}
                                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/10 transition-colors relative">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                        ) : (
                                            <span className={`font-display text-9xl font-black text-white/5 group-hover:text-accent-${member.side === 'left' ? 'primary' : 'secondary'}/10 transition-colors duration-500 select-none`}>
                                                {member.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="pt-20 flex justify-center text-center">
                    <div className="max-w-6xl mx-auto">
                        <p className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-12 tracking-tighter text-glow drop-shadow-2xl">
                            "{philosophy.quote}"
                        </p>
                        <a href="#audit">
                            <Button variant="glow" className="px-16 py-8 text-xl shadow-2xl shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:scale-105 transition-transform duration-300">
                                {philosophy.cta}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
