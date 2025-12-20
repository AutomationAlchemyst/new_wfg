
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ArrowRight, ArrowLeft, Bot, Calendar, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './UIComponents';
import emailjs from '@emailjs/browser';
import Cal, { getCalApi } from "@calcom/embed-react";

export default function ContactSection() {
   const [step, setStep] = useState(1);
   const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      challenge: '',
      budget: '',
      timeline: ''
   });

   // --- Helper: Submit to Google Sheet ---
   const submitToGoogleSheet = async (data: any) => {
      const scriptURL = import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL;
      console.log('Attempting to submit to Sheet:', scriptURL, data);

      if (scriptURL) {
         try {
            await fetch(scriptURL, {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'text/plain',
               },
               body: JSON.stringify(data),
            });
            console.log('Submission request sent.');
         } catch (error) {
            console.error('Google Sheet Error:', error);
         }
      } else {
         console.error('ERROR: VITE_GOOGLE_SHEET_SCRIPT_URL is missing!');
      }
   };

   // --- 1. Cal.com Initialization ---
   useEffect(() => {
      (async function () {
         const cal = await getCalApi({ "namespace": "audit" });
         cal("ui", { "styles": { "branding": { "brandColor": "#3B82F6" } }, "hideEventTypeDetails": false, "layout": "month_view" });
      })();
   }, []);

   // --- 2. Listen for Booking Success ---
   useEffect(() => {
      if (formState === 'success') {
         (async function () {
            const cal = await getCalApi({ "namespace": "audit" });
            cal("on", {
               action: "bookingSuccessful",
               callback: (e: any) => {
                  const bookingData = e.detail.data;
                  submitToGoogleSheet({
                     type: 'booking',
                     email: formData.email,
                     date: bookingData.date,
                     time: bookingData.startTime ? new Date(bookingData.startTime).toLocaleTimeString() : 'Unknown'
                  });
               }
            });
         })();
      }
   }, [formState, formData.email]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState('submitting');

      // --- 3. Google Sheet Logic (Attempt first) ---
      try {
         await submitToGoogleSheet({
            ...formData,
            type: 'lead'
         });
      } catch (sheetError) {
         console.error('Google Sheet Lead Submission Failed:', sheetError);
      }

      // --- 4. EmailJS Logic ---
      try {
         await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
               from_name: formData.name,
               from_email: formData.email,
               company: formData.company,
               message: formData.challenge,
               budget: formData.budget,
               timeline: formData.timeline,
               reply_to: formData.email,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
         );
      } catch (emailError) {
         console.error('Email failed:', emailError);
      }

      // Always proceed to success state
      setFormState('success');
   };

   const nextStep = () => setStep(s => s + 1);
   const prevStep = () => setStep(s => s - 1);

   if (formState === 'success') {
      return (
         <section id="audit" className="py-32 px-6 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center space-y-8">
               <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={48} />
               </div>
               <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight text-glow">We've Started!</h2>
               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  Now, let's pick a time to chat. Select a time for your Free Call below.
               </p>

               {/* Cal.com Embed */}
               <div className="w-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#0A0B1E] shadow-2xl min-h-[600px]">
                  <Cal
                     namespace="audit"
                     calLink={import.meta.env.VITE_CAL_LINK}
                     style={{ width: "100%", height: "100%", overflow: "scroll" }}
                     config={{ layout: 'month_view', theme: 'dark' }}
                  />
               </div>

               <Button variant="secondary" onClick={() => setFormState('idle')} className="!bg-white/5 !border-white/10 !text-white hover:!bg-white/10">Return to Site</Button>
            </div>
         </section>
      );
   }

   return (
      <section id="audit" className="py-20 md:py-32 px-4 md:px-12 relative z-10 overflow-hidden">
         {/* Background Accents */}
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1 space-y-12">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                     Free Business Review
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white">
                     Ready to <span className="text-accent-primary italic text-glow">Grow?</span>
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                     Our review is a friendly chat to see how we can help you save time. No sales pressure, just helpful advice.
                  </p>
               </div>

               <div className="space-y-10">
                  <div className="flex gap-6 group">
                     <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-primary group-hover:scale-110 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/20 transition-all duration-500 shadow-lg">
                        <Bot size={32} />
                     </div>
                     <div>
                        <h4 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">Instant Tips</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                           As soon as you submit, we'll send you a quick tip to help you right away.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-secondary group-hover:scale-110 group-hover:bg-accent-secondary/10 group-hover:border-accent-secondary/20 transition-all duration-500 shadow-lg">
                        <Calendar size={32} />
                     </div>
                     <div>
                        <h4 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-accent-secondary transition-colors">Easy Scheduling</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                           Pick a time that works for you directly on our calendar.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-lg">
                        <FileText size={32} />
                     </div>
                     <div>
                        <h4 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">A Simple Plan</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                           We'll listen to you and give you a clear plan to move forward.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1">
               <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="flex justify-between items-center mb-12 relative z-10">
                     <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                           <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= i ? 'bg-accent-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
                        ))}
                     </div>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 0{step} of 03</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                     {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                              <input
                                 id="name"
                                 type="text"
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                                 placeholder="Jane Doe"
                                 value={formData.name}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                              <input
                                 id="email"
                                 type="email"
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                                 placeholder="jane@company.com"
                                 value={formData.email}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <Button type="button" variant="glow" className="w-full py-6 text-lg" onClick={nextStep}>
                              Continue <ArrowRight size={20} />
                           </Button>
                        </div>
                     )}

                     {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                              <input
                                 id="company"
                                 type="text"
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                                 placeholder="Acme Inc."
                                 value={formData.company}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Main Problem</label>
                              <textarea
                                 id="challenge"
                                 required
                                 className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white min-h-[140px] resize-none placeholder:text-slate-600"
                                 placeholder="What is the #1 thing wasting your time right now?"
                                 value={formData.challenge}
                                 onChange={handleInputChange}
                              ></textarea>
                           </div>
                           <div className="flex gap-4">
                              <Button type="button" variant="secondary" className="flex-1 py-6 !bg-transparent !border-white/10 !text-white hover:!bg-white/5" onClick={prevStep}>
                                 <ArrowLeft size={18} /> Back
                              </Button>
                              <Button type="button" variant="glow" className="flex-[2] py-6 text-lg" onClick={nextStep}>
                                 Continue <ArrowRight size={20} />
                              </Button>
                           </div>
                        </div>
                     )}

                     {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Budget</label>
                              <div className="relative">
                                 <select
                                    id="budget"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white appearance-none cursor-pointer"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                 >
                                    <option value="" className="bg-[#0A0B1E]">Select Range</option>
                                    <option value="500-1k" className="bg-[#0A0B1E]">$500 - $1k</option>
                                    <option value="1k-3k" className="bg-[#0A0B1E]">$1k - $3k</option>
                                    <option value="3k-5k" className="bg-[#0A0B1E]">$3k - $5k</option>
                                    <option value="5k-10k" className="bg-[#0A0B1E]">$5k - $10k</option>
                                    <option value="10k-25k" className="bg-[#0A0B1E]">$10k - $25k</option>
                                    <option value="25k+" className="bg-[#0A0B1E]">$25k+</option>
                                 </select>
                                 <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <ArrowRight size={16} className="rotate-90" />
                                 </div>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">When to Start?</label>
                              <div className="relative">
                                 <select
                                    id="timeline"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all text-white appearance-none cursor-pointer"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                 >
                                    <option value="" className="bg-[#0A0B1E]">Select Timeline</option>
                                    <option value="immediate" className="bg-[#0A0B1E]">Immediately</option>
                                    <option value="1-3-months" className="bg-[#0A0B1E]">1-3 Months</option>
                                    <option value="planning" className="bg-[#0A0B1E]">Just Planning</option>
                                 </select>
                                 <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <ArrowRight size={16} className="rotate-90" />
                                 </div>
                              </div>
                           </div>

                           {formState === 'error' && (
                              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                 <AlertCircle size={18} />
                                 Something went wrong. Please try again.
                              </div>
                           )}

                           <div className="flex gap-4">
                              <Button type="button" variant="secondary" className="flex-1 py-6 !bg-transparent !border-white/10 !text-white hover:!bg-white/5" onClick={prevStep}>
                                 <ArrowLeft size={18} /> Back
                              </Button>
                              <Button
                                 type="submit"
                                 variant="glow"
                                 className="flex-[2] py-6 text-lg"
                                 disabled={formState === 'submitting'}
                              >
                                 {formState === 'submitting' ? (
                                    <><Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing...</>
                                 ) : (
                                    <>Submit & Schedule <Send size={20} className="ml-2" /></>
                                 )}
                              </Button>
                           </div>
                        </div>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}