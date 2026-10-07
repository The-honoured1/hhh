import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0e0d]/95 backdrop-blur-md border-b border-[#2e2b26]/70 shadow-lg py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand title, one line (Top Bar Contract) */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif tracking-wider text-[#f5f2eb] hover:text-[#c48d42] transition-colors whitespace-nowrap"
          >
            {RESTAURANT_INFO.name}
          </a>

          {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line text links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#c4beb3]">
            <a
              href="#menu"
              className="hover:text-[#f5f2eb] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c48d42] hover:after:w-full after:transition-all"
            >
              Menu
            </a>
            <a
              href="#about"
              className="hover:text-[#f5f2eb] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c48d42] hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="#location"
              className="hover:text-[#f5f2eb] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c48d42] hover:after:w-full after:transition-all"
            >
              Location & Hours
            </a>
            <a
              href="#cellar"
              className="hover:text-[#f5f2eb] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c48d42] hover:after:w-full after:transition-all"
            >
              Private Cellar
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#14120e] bg-[#c48d42] hover:bg-[#d9a254] transition-colors rounded-sm whitespace-nowrap active:scale-[0.98]"
            >
              Book a Table
            </button>

            <button
              onClick={onOpenCart}
              aria-label="View WhatsApp Order Cart"
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#f5f2eb] bg-[#1d1b18] hover:bg-[#282622] border border-[#3d3830] transition-colors rounded-sm whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#25D366]" />
              <span className="hidden lg:inline">WhatsApp Order</span>
              {cartItemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#25D366] rounded-full tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#c4beb3] hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141311] border-b border-[#2e2b26] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-[#c4beb3]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#f5f2eb] border-b border-[#24221d]"
            >
              Menu
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#f5f2eb] border-b border-[#24221d]"
            >
              About
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#f5f2eb] border-b border-[#24221d]"
            >
              Location & Hours
            </a>
            <a
              href="#cellar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#f5f2eb] border-b border-[#24221d]"
            >
              Private Cellar
            </a>
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#14120e] bg-[#c48d42] hover:bg-[#d9a254] transition-colors rounded-sm"
            >
              Book a Table
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Ember & Thyme, I would like to inquire about reservations or dining.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 text-[#f5f2eb] bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 transition-colors rounded-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Direct WhatsApp Concierge
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
