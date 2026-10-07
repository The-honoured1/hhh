import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenCart }) => {
  return (
    <footer className="bg-[#0a0909] border-t border-[#1f1d19] text-xs text-[#8c8577]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Ethos */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif text-[#f5f2eb]">
              {RESTAURANT_INFO.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c48d42]">
              {RESTAURANT_INFO.subheading}
            </p>
            <p className="text-xs text-[#9c9588] font-light leading-relaxed max-w-sm">
              Live hearth cooking over aged Sussex red oak and olive branch charcoal.
              Honoring wild botanicals, sustainable heritage farms, and low-intervention European winemakers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#101912] bg-[#25D366] hover:bg-[#20ba5a] rounded-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Concierge</span>
              </a>
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#f5f2eb] bg-[#1e1c18] hover:bg-[#2b2823] border border-[#38332a] rounded-sm transition-colors"
              >
                Book Table
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f5f2eb]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#f5f2eb] transition-colors">
                  Autumn Hearth Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#f5f2eb] transition-colors">
                  Our Culinary Philosophy
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#f5f2eb] transition-colors">
                  Location & Table Hours
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCart}
                  className="hover:text-[#f5f2eb] text-left transition-colors"
                >
                  WhatsApp Ordering & Takeaway
                </button>
              </li>
              <li>
                <a href="#cellar" className="hover:text-[#f5f2eb] transition-colors">
                  Private Cellar & Private Hire
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Location */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f5f2eb]">
              Sanctuary Details
            </p>
            <div className="space-y-2.5 text-xs text-[#9c9588]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c48d42] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#f5f2eb]">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c48d42] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#f5f2eb]">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#787165]">
                <p>Private Dining & Cellar Tastings: 12 – 40 guests</p>
                <p>Dress Code: Smart Casual · Valet Service Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-12 pt-8 border-t border-[#1c1a16] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6e685d]">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Covent Market Quarter, London</span>
            <span>·</span>
            <span>Live Red Oak Hearth</span>
            <span>·</span>
            <span>No Artificial Additives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
