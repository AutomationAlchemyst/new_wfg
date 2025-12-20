import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, RevealText, DecryptText } from './UIComponents';
import { SITE_CONTENT } from '../content';

interface HeroProps {
    heroRef: React.RefObject<HTMLElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroRef }) => {
    const { hero } = SITE_CONTENT;

    return (
        <header ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-10">
            {/* Subtle Gradient Glow */}
            <div className="hero-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>

            <div className="max-w-6xl mx-auto space-y-10 pointer-events-none">
                <div className="hero-anim pointer-events-auto">
                    <RevealText delay={100}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-accent-primary mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                            </span>
                            <DecryptText text={hero.badge} />
                        </div>
                    </RevealText>
                </div>

                <div className="hero-anim">
                    <RevealText delay={300}>
                        <h1 className="font-display text-5xl md:text-[10rem] font-bold tracking-tighter leading-[0.9] md:leading-[0.85] text-white pb-4 select-none">
                            <span className="glitch-text block md:inline" data-text={hero.title.glitch}>{hero.title.glitch}</span> <span className="text-slate-500 italic font-light font-sans">{hero.title.italic}</span> <span className="text-glow block md:inline">{hero.title.main}</span>
                        </h1>
                    </RevealText>
                </div>

                <div className="hero-anim">
                    <RevealText delay={500}>
                        <p className="text-lg md:text-4xl text-slate-300 font-light max-w-3xl mx-auto leading-tight drop-shadow-md px-4">
                            {hero.description}
                        </p>
                    </RevealText>
                </div>

                <div className="hero-anim pointer-events-auto">
                    <RevealText delay={700}>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                            <a href="#audit">
                                <Button variant="glow" className="!text-lg !px-8 !py-4">
                                    {hero.cta} <ArrowRight className="w-5 h-5" />
                                </Button>
                            </a>

                        </div>
                    </RevealText>
                </div>
            </div>

            {/* Scroll Indicator */}

        </header>
    );
};
