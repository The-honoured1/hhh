import React, { useState } from 'react';
import { MapPin, Clock, Phone, Car, Train, Navigation, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationHoursProps {
  onOpenReservation: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursProps> = ({ onOpenReservation }) => {
  const [activeZone, setActiveZone] = useState<'main' | 'hearth' | 'garden' | 'cellar'>('main');

  // Determine current day for automatic highlight
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];

  return (
    <section id="location" className="py-24 bg-[#121110] border-t border-[#24211c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c48d42] font-semibold mb-2">
            Visit & Hours
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#f5f2eb] tracking-tight mb-4">
            Finding Ember & Thyme
          </h2>
          <p className="text-sm text-[#aba496]">
            Nestled in the quiet historic passage of Covent Market Quarter. Step inside from cobblestone lanes into warm hearth glow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Operating Hours & Quick Booking */}
          <div className="lg:col-span-6 bg-[#161513] border border-[#2a2721] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#c48d42] font-semibold pb-4 border-b border-[#26231d]">
              <Clock className="w-4 h-4" />
              <span>Service Hours & Schedule</span>
            </div>

            <div className="divide-y divide-[#22201a] text-xs">
              {RESTAURANT_INFO.hours.map((schedule, idx) => {
                const isToday = schedule.days.includes(currentDayName);
                return (
                  <div
                    key={idx}
                    className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-colors ${
                      isToday ? 'bg-[#1f1d19] px-3 -mx-3 rounded-sm' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isToday ? 'text-[#f5f2eb]' : 'text-[#c2bcaf]'}`}>
                        {schedule.days}
                      </span>
                      {isToday && (
                        <span className="text-[10px] text-[#c48d42] uppercase tracking-wider font-semibold">
                          Today
                        </span>
                      )}
                    </div>
                    <div className="text-right text-[#a8a194] font-mono tabular-nums">
                      {schedule.lunch !== 'Closed' && (
                        <span>Lunch: {schedule.lunch} · </span>
                      )}
                      <span>Dinner: {schedule.dinner}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#26231d] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#14120e] bg-[#c48d42] hover:bg-[#d9a254] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table Online
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#f5f2eb] bg-[#221f1a] hover:bg-[#2c2923] border border-[#38332a] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#c48d42]" />
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Column 2: Address, Map Simulation & Arrival Guide */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive District Map Card */}
            <div className="bg-[#161513] border border-[#2a2721] rounded-sm overflow-hidden p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c48d42] font-semibold mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location & District</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#f5f2eb]">
                    {RESTAURANT_INFO.address}
                  </h3>
                  <p className="text-xs text-[#a39c8f]">{RESTAURANT_INFO.city}</p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    RESTAURANT_INFO.fullAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#f5f2eb] bg-[#221f1a] hover:bg-[#2c2923] border border-[#38332a] rounded-sm transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#c48d42]" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Architectural stylized district map diagram */}
              <div className="relative w-full h-56 bg-[#1a1815] border border-[#2b2720] rounded-sm overflow-hidden my-5 p-4 flex flex-col justify-between">
                {/* Visual street grid background */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(#c48d42 1px, transparent 1px), linear-gradient(to right, #38332a 1px, transparent 1px), linear-gradient(to bottom, #38332a 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Map Zone Selector buttons */}
                <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {[
                    { id: 'main', label: 'Main Hearth Hall' },
                    { id: 'hearth', label: "Chef's Counter" },
                    { id: 'garden', label: 'Botanical Pergola' },
                    { id: 'cellar', label: 'Sommelier Vault' },
                  ].map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setActiveZone(z.id as any)}
                      className={`px-2.5 py-1 rounded-sm text-[11px] uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
                        activeZone === z.id
                          ? 'bg-[#c48d42] text-[#14120e] font-semibold'
                          : 'bg-[#221f1a]/80 text-[#a39c8e] hover:text-[#f5f2eb] border border-[#332e26]'
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic District Map Viewport */}
                <div className="relative z-10 flex items-center justify-center my-auto py-2">
                  <div className="bg-[#12110f]/90 border border-[#3d372c] px-4 py-3 rounded-sm text-center max-w-sm backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e06d33] animate-pulse" />
                      <p className="font-serif text-sm text-[#f5f2eb]">
                        {activeZone === 'main' && 'The Main Hearth Hall (64 Covers)'}
                        {activeZone === 'hearth' && "The Chef's Ember Counter (10 Seats)"}
                        {activeZone === 'garden' && 'Botanical Heated Pergola (28 Covers)'}
                        {activeZone === 'cellar' && 'Sommelier Tasting Vault (12 Seats)'}
                      </p>
                    </div>
                    <p className="text-[11px] text-[#9c9486]">
                      {activeZone === 'main' && 'Surrounded by candlelit dark oak tables and open fireplace.'}
                      {activeZone === 'hearth' && 'Front row tasting menu view of live red-oak ember cooking.'}
                      {activeZone === 'garden' && 'Covered year-round botanical terrace with heated stones.'}
                      {activeZone === 'cellar' && 'Subterranean brick vault for private tastings and rare vintages.'}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#7d7567] pt-2 border-t border-[#2a261f]">
                  <span>Covent Garden Piazza · 280m</span>
                  <span>Nearest Tube: Covent Garden (3 min)</span>
                </div>
              </div>

              {/* Transit & Arrival info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#a39c8f] pt-2">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f5f2eb]">Underground Stations</p>
                    <p className="text-[11px] text-[#8c8477]">
                      Covent Garden (Piccadilly Line) 3m walk · Leicester Square (Northern Line) 5m.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f5f2eb]">Valet & Parking</p>
                    <p className="text-[11px] text-[#8c8477]">
                      Complimentary evening valet at St. Jude entrance Wed–Sun from 17:30.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
