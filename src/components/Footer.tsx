import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Instagram, Twitter, Music, Loader2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';
import { supabase } from '../lib/supabase';

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase(), source: 'footer_dispatch' }]);

      if (error && error.code !== '23505') { // 23505 is unique violation, which means already subscribed
        throw error;
      }

      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    } catch (err: any) {
      console.error('Subscription error:', err);
      setErrorMsg('Subscription failed. Try again.');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-white/70 dark:bg-[#07090A] border-t border-ink/5 dark:border-white/10 pt-20 overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ink/5 dark:border-white/10">
          
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="text-2xl font-medium tracking-tight text-ink dark:text-white">
              {BRAND_CONFIG.name}
            </Link>
            <p className="text-sm text-muted dark:text-neutral-400 max-w-sm leading-relaxed">
              {BRAND_CONFIG.subtagline} Designed in Copenhagen. Assembled with aerospace tolerance.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white mb-2">
                Studio Dispatch
              </span>
              <p className="text-xs text-muted dark:text-neutral-400 mb-3">
                Receive private acoustic release invitations and firmware engineering logs.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.com"
                    required
                    disabled={loading || subscribed}
                    className="flex-1 px-4 py-2.5 rounded-full bg-bg dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-xs text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={loading || subscribed}
                    className="px-5 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-xs font-semibold uppercase tracking-wider hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : subscribed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Joined</span>
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {errorMsg && <p className="text-[11px] text-red-500 pl-2">{errorMsg}</p>}
                {subscribed && <p className="text-[11px] text-accent pl-2 font-medium">Invitation confirmed. Welcome to VODOX Studio.</p>}
              </form>
            </div>
          </div>

          {/* Links: Collection (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white">
              Collection
            </span>
            <ul className="space-y-2.5 text-sm text-muted dark:text-neutral-400">
              <li>
                <Link to="/products/midnight" className="hover:text-ink dark:hover:text-white transition-colors">
                  Horizon Midnight
                </Link>
              </li>
              <li>
                <Link to="/products/rose" className="hover:text-ink dark:hover:text-white transition-colors">
                  Horizon Rose
                </Link>
              </li>
              <li>
                <Link to="/products/sky" className="hover:text-ink dark:hover:text-white transition-colors">
                  Horizon Sky with Smart Case
                </Link>
              </li>
              <li>
                <Link to="/products/mint" className="hover:text-ink dark:hover:text-white transition-colors">
                  Horizon Mint
                </Link>
              </li>
              <li>
                <Link to="/products/onyx" className="hover:text-ink dark:hover:text-white transition-colors">
                  Horizon Onyx Studio Flagship
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Technology & Architecture (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white">
              Engineering
            </span>
            <ul className="space-y-2.5 text-sm text-muted dark:text-neutral-400">
              <li>
                <Link to="/technology" className="hover:text-ink dark:hover:text-white transition-colors">
                  Titanium Diaphragm
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-ink dark:hover:text-white transition-colors">
                  Hybrid Triple-Mic ANC
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-ink dark:hover:text-white transition-colors">
                  Spatial Gyro Engine
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-ink dark:hover:text-white transition-colors">
                  Mastering Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Studio (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <span className="block text-xs uppercase tracking-widest font-semibold text-ink dark:text-white">
              Connect
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-bg dark:bg-white/[0.04] border border-ink/5 dark:border-white/10 hover:border-ink/20 text-ink/70 dark:text-neutral-300 hover:text-ink dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={BRAND_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-bg dark:bg-white/[0.04] border border-ink/5 dark:border-white/10 hover:border-ink/20 text-ink/70 dark:text-neutral-300 hover:text-ink dark:hover:text-white transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={BRAND_CONFIG.socials.spotify}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-bg dark:bg-white/[0.04] border border-ink/5 dark:border-white/10 hover:border-ink/20 text-ink/70 dark:text-neutral-300 hover:text-ink dark:hover:text-white transition-colors"
                aria-label="Spotify Acoustic Playlists"
              >
                <Music className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-xs text-muted dark:text-neutral-500 pt-2 leading-relaxed">
              {BRAND_CONFIG.contact.address}
            </p>
          </div>

        </div>

        {/* Legal Row */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted dark:text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name} Audio Corp. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ink dark:hover:text-white cursor-pointer">Privacy Charter</span>
            <span className="hover:text-ink dark:hover:text-white cursor-pointer">Warranty & Service</span>
            <span className="hover:text-ink dark:hover:text-white cursor-pointer">Compliance</span>
          </div>
        </div>

      </div>

      {/* Huge Cropped Wordmark */}
      <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.05] dark:opacity-[0.08] -mb-10 sm:-mb-16 md:-mb-24">
        <span
          className="text-[clamp(6rem,22vw,22rem)] font-bold tracking-[-0.05em] leading-none text-ink dark:text-white whitespace-nowrap"
          style={{ fontFamily: 'Inter Tight, sans-serif' }}
        >
          {BRAND_CONFIG.name}
        </span>
      </div>
    </footer>
  );
}
