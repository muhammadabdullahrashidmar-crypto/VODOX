import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { StudioLighting } from '../components/StudioLighting';
import { BRAND_CONFIG } from '../data/brand';
import { supabase } from '../lib/supabase';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          topic: topic,
          message: message.trim(),
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setErrorMsg('Failed to send inquiry. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 relative min-h-screen">
      <StudioLighting tintColor="rgba(94, 156, 147, 0.14)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Concierge & Studio Care
          </span>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2">
            Connect with our acoustics team.
          </h1>
          <p className="text-sm text-muted dark:text-neutral-400 mt-3 leading-relaxed">
            Have questions about frequency response, bespoke studio fittings, or institutional orders? 
            Leave your inquiry below and our engineers will get in touch within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-[28px] liquid-glass shadow-liquid dark:shadow-liquid-dark">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center border border-accent/20">
                    <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-ink dark:text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-muted dark:text-neutral-400 max-w-sm leading-relaxed">
                    Thank you for contacting VODOX. Your inquiry has been routed to our studio team in Copenhagen.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-xs font-semibold uppercase tracking-wider hover:bg-accent transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-neutral-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full px-4 py-3 rounded-2xl bg-bg/50 dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-sm text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-neutral-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@studio.com"
                        className="w-full px-4 py-3 rounded-2xl bg-bg/50 dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-sm text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-neutral-400">
                      Topic of Inquiry
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-bg/50 dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-sm text-ink dark:text-white focus:outline-none focus:border-accent"
                    >
                      <option value="Product Inquiry" className="dark:bg-[#0A0C0D]">Product & Finish Specifications</option>
                      <option value="Studio Fitting" className="dark:bg-[#0A0C0D]">Acoustic Fitting & 30-Day Trial</option>
                      <option value="Commercial / B2B" className="dark:bg-[#0A0C0D]">Studio / Label Bulk Licensing</option>
                      <option value="Warranty & Service" className="dark:bg-[#0A0C0D]">Warranty, Parts & Support</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-neutral-400">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details regarding your acoustic setup or inquiry..."
                      className="w-full px-4 py-3 rounded-2xl bg-bg/50 dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-sm text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-8 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-studio active:scale-[0.99] disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[28px] liquid-glass shadow-liquid dark:shadow-liquid-dark space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
                Direct Channels
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-muted dark:text-neutral-400">Email</h4>
                    <p className="text-sm font-medium text-ink dark:text-white">{BRAND_CONFIG.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-muted dark:text-neutral-400">Phone</h4>
                    <p className="text-sm font-medium text-ink dark:text-white">{BRAND_CONFIG.contact.support}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-muted dark:text-neutral-400">Studio</h4>
                    <p className="text-sm font-medium text-ink dark:text-white">{BRAND_CONFIG.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2 text-accent">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Automated Sync</span>
              </div>
              <p className="text-xs text-muted dark:text-neutral-300 leading-relaxed">
                All submissions are securely encrypted and synchronized directly with the VODOX Supabase Cloud Database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
