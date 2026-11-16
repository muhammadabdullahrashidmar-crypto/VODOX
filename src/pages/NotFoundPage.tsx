import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Radio } from 'lucide-react';
import { StudioLighting } from '../components/StudioLighting';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 relative">
      <StudioLighting tintColor="rgba(94, 156, 147, 0.15)" />

      <div className="relative z-10 text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-6 border border-accent/20">
          <Radio className="w-8 h-8" strokeWidth={1.5} />
        </div>

        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
          Error 404 · Signal Lost
        </span>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-ink dark:text-white mt-2 mb-4">
          Acoustic Horizon Not Found
        </h1>

        <p className="text-sm text-muted dark:text-neutral-400 mb-8 leading-relaxed">
          The soundscape or product page you requested has migrated or does not exist in our studio archive.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ink dark:bg-white hover:bg-accent dark:hover:bg-accent text-white dark:text-ink dark:hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-studio"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Return to Studio</span>
        </Link>
      </div>
    </div>
  );
}
