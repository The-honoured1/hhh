import React, { useState } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import type { ReservationDetails } from '../types/restaurant';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReservationDetails>({
    guestName: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '19:30',
    partySize: 2,
    seatingArea: 'Dining Room',
    specialOccasion: '',
    dietaryNotes: '',
  });

  const [confirmed, setConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const timeSlots = [
    '12:30',
    '13:15',
    '14:00',
    '17:30',
    '18:00',
    '18:45',
    '19:30',
    '20:15',
    '21:00',
    '21:30',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `ET-${Math.floor(10000 + Math.random() * 90000)}`;
    setReservationCode(code);
    setConfirmed(true);
  };

  const handleBookViaWhatsApp = () => {
    const text =
      `*TABLE RESERVATION INQUIRY - EMBER & THYME*\n\n` +
      `👤 Guest Name: ${formData.guestName || 'Guest'}\n` +
      `👥 Party Size: ${formData.partySize} Guests\n` +
      `📅 Date: ${formData.date}\n` +
      `⏰ Desired Time: ${formData.timeSlot}\n` +
      `🪑 Preferred Seating: ${formData.seatingArea}\n` +
      (formData.specialOccasion ? `🎉 Occasion: ${formData.specialOccasion}\n` : '') +
      (formData.dietaryNotes ? `🌿 Dietary / Requests: ${formData.dietaryNotes}\n` : '') +
      (formData.phone ? `📞 Phone: ${formData.phone}\n` : '') +
      `\nPlease let me know table availability. Thank you!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-[#141311] border border-[#2e2a24] rounded-sm shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#8f887b] hover:text-[#f5f2eb] rounded-sm hover:bg-[#201e19]"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#c48d42] mx-auto animate-pulse" />
            <h3 className="text-2xl font-serif text-[#f5f2eb]">Table Reserved</h3>
            <p className="text-xs uppercase tracking-widest text-[#a8a194]">
              Reservation Ref: <span className="font-mono text-[#f5f2eb] font-bold">{reservationCode}</span>
            </p>
            <div className="bg-[#1b1916] border border-[#2a2620] p-4 rounded-sm text-xs text-[#bfb8ac] max-w-md mx-auto space-y-1.5 text-left">
              <p><strong className="text-[#f5f2eb]">Guest:</strong> {formData.guestName}</p>
              <p><strong className="text-[#f5f2eb]">Date & Time:</strong> {formData.date} at {formData.timeSlot}</p>
              <p><strong className="text-[#f5f2eb]">Party Size:</strong> {formData.partySize} Guests ({formData.seatingArea})</p>
              {formData.dietaryNotes && (
                <p><strong className="text-[#f5f2eb]">Notes:</strong> {formData.dietaryNotes}</p>
              )}
            </div>
            <p className="text-xs text-[#8c8577] max-w-sm mx-auto">
              A confirmation text has been dispatched. Our maître d’ looks forward to welcoming you to the hearth.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleBookViaWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#12100d] bg-[#25D366] hover:bg-[#20ba5a] rounded-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Notify Maître d’ on WhatsApp
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f5f2eb] bg-[#221f1a] hover:bg-[#2c2923] border border-[#38332a] rounded-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c48d42] font-semibold mb-1">
                Table Reservations
              </p>
              <h2 className="text-2xl font-serif text-[#f5f2eb]">
                Reserve Your Dining Experience
              </h2>
              <p className="text-xs text-[#9c9587] mt-1">
                Tables are held for 15 minutes. For parties over 8 or private cellar hire, please select WhatsApp concierge.
              </p>
            </div>

            {/* Date & Party Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c48d42]" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c48d42]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c48d42]" />
                  Party Size
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) =>
                    setFormData({ ...formData, partySize: parseInt(e.target.value, 10) })
                  }
                  className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c48d42]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, '8+ (Private Cellar Dining)'].map((num, i) => (
                    <option key={i} value={typeof num === 'number' ? num : 8}>
                      {typeof num === 'number' ? `${num} ${num === 1 ? 'Guest' : 'Guests'}` : num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Area */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-1.5">
                Preferred Seating Ambience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Dining Room', label: 'Main Hearth Hall' },
                  { id: "Chef's Hearth Counter", label: "Chef's Counter" },
                  { id: 'Botanical Garden Terrace', label: 'Garden Terrace' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, seatingArea: area.id as any })
                    }
                    className={`py-2 px-2 text-[11px] font-medium rounded-sm border transition-colors ${
                      formData.seatingArea === area.id
                        ? 'bg-[#292621] text-[#f5f2eb] border-[#c48d42]'
                        : 'bg-[#1b1916] text-[#8f887b] border-[#29251f] hover:text-white'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c48d42]" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeSlot: time })}
                    className={`py-1.5 text-xs font-mono rounded-sm border transition-colors tabular-nums ${
                      formData.timeSlot === time
                        ? 'bg-[#c48d42] text-[#12100d] font-semibold border-[#c48d42]'
                        : 'bg-[#1b1916] text-[#b3ac9f] border-[#29251f] hover:text-white hover:border-[#3d382f]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Primary Guest Name *"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Contact Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                required
                placeholder="Email Address for Confirmation *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
              />
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Special occasion, dietary restrictions, or table notes..."
                value={formData.dietaryNotes}
                onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                className="w-full bg-[#1b1916] border border-[#2c2822] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-[#14120e] bg-[#c48d42] hover:bg-[#d9a254] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Confirm Table Reservation
              </button>

              <button
                type="button"
                onClick={handleBookViaWhatsApp}
                className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#101912] bg-[#25D366] hover:bg-[#20ba5a] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Reserve via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
