import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, Calculator } from 'lucide-react';
import { Card, Button } from './UIComponents';
import { SITE_CONTENT } from '../content';

export const ROICalculator: React.FC = () => {
    const { roi } = SITE_CONTENT;
    const [teamSize, setTeamSize] = useState(10);
    const [manualHours, setManualHours] = useState(5);
    const [savings, setSavings] = useState({ hours: 0, cost: 0 });

    useEffect(() => {
        const weeklyHours = teamSize * manualHours;
        const yearlyHours = weeklyHours * 52;
        const automatedHours = Math.floor(yearlyHours * 0.8); // Assume 80% automation
        const costSavings = automatedHours * 50; // Assume $50/hr average cost
        setSavings({ hours: automatedHours, cost: costSavings });
    }, [teamSize, manualHours]);

    return (
        <section id="roi" className="py-20 md:py-32 px-4 md:px-12 relative z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <Calculator size={14} /> ROI Calculator
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                        {roi.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
                        {roi.description}
                    </p>

                    <div className="space-y-10 mt-12">
                        {roi.metrics.map((metric) => (
                            <div key={metric.label} className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                        {metric.label}
                                    </label>
                                    <span className="text-2xl font-mono font-bold text-accent-primary text-glow">
                                        {metric.label === 'Team Size' ? teamSize : manualHours}
                                        <span className="text-sm text-slate-500 ml-1 font-sans">{metric.unit}</span>
                                    </span>
                                </div>
                                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-primary to-accent-secondary shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                                        style={{ width: `${((metric.label === 'Team Size' ? teamSize : manualHours) - metric.min) / (metric.max - metric.min) * 100}%` }}
                                    ></div>
                                    <input
                                        type="range"
                                        min={metric.min}
                                        max={metric.max}
                                        step={metric.step}
                                        value={metric.label === 'Team Size' ? teamSize : manualHours}
                                        onChange={(e) => metric.label === 'Team Size' ? setTeamSize(parseInt(e.target.value)) : setManualHours(parseInt(e.target.value))}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <Card className="p-8 md:p-12 !bg-white/5 !border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-gradient-x"></div>

                        <div className="space-y-10 relative z-10">
                            <div className="flex items-center gap-4 text-accent-secondary">
                                <TrendingUp size={24} className="animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em]">Projected Annual Impact</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                        <Clock size={14} /> Time Reclaimed
                                    </div>
                                    <div className="text-4xl md:text-5xl font-mono font-bold text-white tabular-nums group-hover:text-glow transition-all duration-500">
                                        {savings.hours.toLocaleString()}<span className="text-lg text-accent-primary ml-1">hrs</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                        <DollarSign size={14} /> Capital Efficiency
                                    </div>
                                    <div className="text-4xl md:text-5xl font-mono font-bold text-white tabular-nums group-hover:text-glow transition-all duration-500">
                                        ${(savings.cost / 1000).toFixed(0)}<span className="text-lg text-accent-secondary ml-1">k+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-slate-500 text-xs mb-8 leading-relaxed italic">
                                    *Based on a conservative 80% automation efficiency and industry average operational costs ($50/hr). Actual results may vary based on system complexity.
                                </p>
                                <a href="#audit">
                                    <Button variant="glow" className="w-full py-6 text-lg shadow-xl shadow-accent-primary/10">
                                        Get Your Custom Audit
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
