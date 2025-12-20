import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from 'lucide-react';
import { SITE_CONTENT } from '../content';
import { Button } from './UIComponents';

export const FAQ: React.FC = () => {
    const { faq } = SITE_CONTENT;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 md:py-32 px-4 md:px-12 relative z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <HelpCircle size={14} /> Common Questions
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">{faq.title}</h2>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Everything you need to know about how we help businesses automate and scale.
                    </p>
                </div>

                <div className="space-y-4">
                    {faq.items.map((item, i) => (
                        <div
                            key={i}
                            className={`group border rounded-2xl transition-all duration-500 ${openIndex === i ? 'border-accent-primary/30 bg-white/5 shadow-[0_0_30px_rgba(59,130,246,0.05)]' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'}`}
                        >
                            <button
                                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span className={`text-lg font-semibold transition-colors duration-300 ${openIndex === i ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                    {item.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-accent-primary' : 'text-slate-500'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 md:px-8 pb-8">
                                    <div className="w-full h-px bg-white/5 mb-6"></div>
                                    <p className="text-slate-400 leading-relaxed text-lg">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-transparent border border-white/5 text-center space-y-6">
                    <h3 className="font-display text-2xl font-bold text-white">Still have questions?</h3>
                    <p className="text-slate-400">We're here to help you navigate your automation journey.</p>
                    <a href="https://wa.me/6583215730?text=Hi%20WorkFlowGuys%2C%20i%20want%20to%20know%20more" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <Button variant="secondary" className="!bg-white/5 !border-white/10 !text-white hover:!bg-white/10">
                            Contact Support
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};
