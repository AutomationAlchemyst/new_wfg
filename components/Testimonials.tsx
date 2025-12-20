import React from 'react';
import { Quote } from 'lucide-react';
import { Card, RevealText } from './UIComponents';
import { SITE_CONTENT } from '../content';

export const Testimonials: React.FC = () => {
    const { testimonials } = SITE_CONTENT;

    return (
        <section className="py-20 md:py-32 px-4 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {testimonials.map((t, i) => (
                        <RevealText key={i} delay={i * 200}>
                            <Card className="p-6 md:p-10 !bg-white/5 !border-white/10 hover:!border-accent-primary/30 transition-all duration-500 group h-full flex flex-col justify-between">
                                <div>
                                    <Quote className="w-8 h-8 md:w-12 md:h-12 text-accent-primary/20 mb-6 md:mb-8 group-hover:text-accent-primary/40 transition-colors" />
                                    <p className="text-lg md:text-2xl text-slate-200 font-light leading-relaxed mb-8 md:mb-10">
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-white font-display font-bold text-xl">
                                            {t.author[0]}
                                        </div>
                                        <div>
                                            <div className="font-display font-bold text-white text-lg">{t.author}</div>
                                            <div className="text-sm text-accent-primary/80">{t.title}</div>
                                        </div>
                                    </div>
                                    {/* Logo filter inverted for dark mode visibility if needed, or kept grayscale */}
                                    <img src={t.logo} alt={`${t.author} - ${t.title} logo`} className="h-12 w-auto object-contain" />
                                </div>
                            </Card>
                        </RevealText>
                    ))}
                </div>
            </div>
        </section>
    );
};
