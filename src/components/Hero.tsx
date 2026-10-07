import React from 'react';
import { ArrowRight, Flame, Wine, Clock, MessageCircle } from 'lucide-react';
import { ASSET_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenCart }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0d0c0b] pt-24 pb-16">
      {/* Background Photography with Depth Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="Ember & Thyme candlelit dining room and wood-fired hearth"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-90 contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for WCAG AA 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/75 to-[#0d0c0b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/90 via-[#0d0c0b]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker (no pill badge) */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#c48d42] mb-4 font-semibold">
            <Flame className="w-4 h-4 text-[#e06d33]" />
            <span>Artisanal Wood Hearth & Botanical Cellar</span>
            <span aria-hidden="true" className="text-[#696256]">·</span>
            <span className="text-[#a8a194] hidden sm:inline">Covent Market, London</span>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#f7f4ee] leading-[1.08] tracking-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            Live Embers. Heritage Harvest. Botanical Spirits.
          </h1>

          {/* Prose description */}
          <p className="text-base sm:text-lg text-[#ccc6ba] font-light leading-relaxed mb-8 max-w-2xl">
            Savor seasonal dining centered on our 850° red oak hearth. From 45-day dry-aged heritage steaks
            and hand-rolled truffle pastas to wild botanical cocktails, every plate honors the fire and the grower.
          </p>

          {/* Action cluster */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12100d] bg-[#c48d42] hover:bg-[#d9a254] transition-all rounded-sm shadow-md active:scale-[0.98]"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#f5f2eb] bg-[#1d1b18]/80 hover:bg-[#282622] border border-[#453e34] transition-all rounded-sm backdrop-blur-sm active:scale-[0.98]"
            >
              Book a Table
            </button>

            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#e8f5e9] bg-[#1a3824]/90 hover:bg-[#234d31] border border-[#2e7d43]/50 transition-all rounded-sm backdrop-blur-sm active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-[#4ade80]" />
              <span>WhatsApp Order</span>
            </button>
          </div>

          {/* Editorial info strip */}
          <div className="pt-6 border-t border-[#2d2a24]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#b8b1a4]">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#ede8de]">Dinner Service Tonight</p>
                <p className="text-[#968f83]">17:30 – 23:00 · Hearth Walk-ins Welcome</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-[#e06d33] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#ede8de]">Red Oak Fire</p>
                <p className="text-[#968f83]">Zero gas cooking · Sussex charcoal</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Wine className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#ede8de]">Natural & Biodynamic</p>
                <p className="text-[#968f83]">180+ low-intervention cellar labels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
