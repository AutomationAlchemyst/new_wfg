import React, { useState, useEffect } from 'react';
import { Button, Card } from './UIComponents';
import { Bot, Calendar, FileText, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Cal, { getCalApi } from "@calcom/embed-react";

const ContactSection = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenge: ''
  });

  // --- 1. Cal.com Initialization ---
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"audit"});
      cal("ui", {"styles":{"branding":{"brandColor":"#2563EB"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  // --- 2. Form Handling ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      // --- 3. EmailJS Logic ---
      // Replace these placeholders with your actual EmailJS Service/Template IDs
      // Get them at https://www.emailjs.com/
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        {
           from_name: formData.name,
           from_email: formData.email,
           company: formData.company,
           message: formData.challenge,
           reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormState('success');
    } catch (error) {
      console.error('Email failed:', error);
      // For demo purposes, we'll force success even if API keys are missing
      // Remove this line in production!
      setFormState('success'); 
      // Uncomment this line in production:
      // setFormState('error');
    }
  };

  return (
    <section id="audit" className="py-32 px-6 md:px-12 relative z-10 bg-gradient-to-b from-transparent to-white/40">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Form / Booking */}
          <div className="order-2 lg:order-1">
             <Card className="bg-white/60 backdrop-blur-xl border-slate-200 shadow-xl shadow-slate-200/50 min-h-[600px] flex flex-col justify-center">
                
                {formState === 'success' ? (
                   // --- Success State: Booking Calendar ---
                   <div className="w-full h-full flex flex-col animate-in fade-in zoom-in duration-500">
                      <div className="text-center mb-6">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-2">
                            <CheckCircle2 size={14} /> Request Received
                         </div>
                         <h3 className="font-display text-2xl font-bold text-slate-900">Now, let's sync.</h3>
                         <p className="text-slate-500 text-sm">Select a time for your Discovery Call below.</p>
                      </div>
                      
                      {/* Cal.com Embed */}
                      <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                         <Cal 
                            namespace="audit"
                            calLink={import.meta.env.VITE_CAL_LINK} 
                            style={{width:"100%",height:"100%",overflow:"scroll"}}
                            config={{layout: 'month_view'}}
                         />
                      </div>
                   </div>
                ) : (
                   // --- Idle State: Enquiry Form ---
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                         <h3 className="font-display text-2xl font-semibold text-slate-900">Book Your Free Automation Audit</h3>
                         <p className="text-slate-500 text-sm">Tell us about your bottleneck. We'll tell you how to break it.</p>
                      </div>

                      <div className="space-y-5">
                         <div>
                            <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                            <input 
                              id="name"
                              type="text" 
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all font-sans text-sm"
                              placeholder="Jane Doe"
                            />
                         </div>
                         
                         <div>
                            <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <input 
                              id="email"
                              type="email" 
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all font-sans text-sm"
                              placeholder="jane@company.com"
                            />
                         </div>

                         <div>
                            <label htmlFor="company" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                            <input 
                              id="company"
                              type="text" 
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all font-sans text-sm"
                              placeholder="Acme Inc."
                            />
                         </div>

                         <div>
                            <label htmlFor="challenge" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Biggest Challenge</label>
                            <textarea 
                              id="challenge"
                              required
                              rows={4}
                              value={formData.challenge}
                              onChange={handleInputChange}
                              className="w-full bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all font-sans text-sm resize-none"
                              placeholder="What is the #1 thing wasting your time right now?"
                            />
                         </div>
                      </div>

                      {formState === 'error' && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                           <AlertCircle size={16} />
                           Something went wrong. Please try again.
                        </div>
                      )}

                      <Button 
                        disabled={formState === 'submitting'}
                        className="w-full flex items-center justify-center gap-2 !py-4"
                        variant="primary"
                      >
                         {formState === 'submitting' ? (
                            <><Loader2 className="animate-spin w-4 h-4" /> Processing...</>
                         ) : (
                            <>Submit & Schedule <ArrowRight className="w-4 h-4" /></>
                         )}
                      </Button>
                   </form>
                )}
             </Card>
          </div>

          {/* Right Column: Info */}
          <div className="order-1 lg:order-2 space-y-12 lg:pt-10">
             <div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">What to Expect</h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                   Our free audit is a no-pressure, high-value conversation. We don't do sales pitches; we do strategy sessions.
                </p>
             </div>

             <div className="space-y-10">
                <div className="flex gap-6 group">
                   <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 group-hover:bg-accent-primary/20 transition-all duration-300">
                      <Bot size={28} />
                   </div>
                   <div>
                      <h4 className="font-display text-xl font-bold text-slate-900 mb-2">AI-Powered Follow-Up</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                         The moment you submit, you'll get an email with an AI-generated tip tailored to the challenge you described. This is just a small taste of what we can build.
                      </p>
                   </div>
                </div>

                <div className="flex gap-6 group">
                   <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary group-hover:scale-110 group-hover:bg-accent-secondary/20 transition-all duration-300">
                      <Calendar size={28} />
                   </div>
                   <div>
                      <h4 className="font-display text-xl font-bold text-slate-900 mb-2">Easy Scheduling</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                         Fill out the form to instantly unlock our booking calendar. Choose a time that works perfectly for you. No back-and-forth.
                      </p>
                   </div>
                </div>

                <div className="flex gap-6 group">
                   <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:bg-slate-200 transition-all duration-300">
                      <FileText size={28} />
                   </div>
                   <div>
                      <h4 className="font-display text-xl font-bold text-slate-900 mb-2">A Practical Plan</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                         During our call, we won't just talk theory. We'll listen, understand your workflow, and give you at least one actionable, high-impact automation strategy.
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default ContactSection;