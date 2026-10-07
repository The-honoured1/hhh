import React, { useState } from 'react';
import { X, Plus, Minus, Sparkles, Clock, Flame, ShoppingBag } from 'lucide-react';
import type { MenuItem } from '../types/restaurant';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option?: string, instructions?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const defaultOption = item.customOptions?.[0]?.choices?.[0]?.label || '';
  const currentOption = selectedOption || defaultOption;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item, currentOption || undefined, specialInstructions.trim() || undefined);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-[#141311] border border-[#2e2a24] rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#141311]/80 hover:bg-[#221f1a] text-[#8f887b] hover:text-[#f5f2eb] rounded-full backdrop-blur-sm"
          aria-label="Close dish modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Dish Image */}
          {item.image && (
            <div className="relative w-full h-64 sm:h-72 bg-[#1d1b17] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-5">
            {/* Dietary unboxed text */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-[#9c9587]">
                {item.dietary.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className={tag === 'Chef Signature' ? 'text-[#c48d42] font-semibold' : ''}>
                      {tag}
                    </span>
                    {idx < item.dietary!.length - 1 && (
                      <span aria-hidden="true" className="text-[#595347]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Title & Price */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f5f2eb] leading-tight">
                {item.name}
              </h2>
              <span className="font-mono text-2xl font-semibold text-[#f5f2eb] tabular-nums shrink-0">
                £{(item.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#bab3a6] font-light leading-relaxed">
              {item.description}
            </p>

            {/* Culinary Details */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#26231e] text-xs text-[#9c9486]">
              {item.prepTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c48d42]" />
                  <span>Prep time: ~{item.prepTime}</span>
                </div>
              )}
              {item.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#e06d33]" />
                  <span>Estimated: {item.calories} kcal</span>
                </div>
              )}
            </div>

            {/* Pairing Note */}
            {item.pairingNote && (
              <div className="bg-[#1b1916] border border-[#2b2721] p-3.5 rounded-sm flex items-start gap-2.5 text-xs text-[#cfc8bc]">
                <Sparkles className="w-4 h-4 text-[#c48d42] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#f5f2eb]">Sommelier's Pairing: </span>
                  <span>{item.pairingNote}</span>
                </div>
              </div>
            )}

            {/* Custom Options if any */}
            {item.customOptions && item.customOptions.length > 0 && (
              <div className="space-y-4 pt-2">
                {item.customOptions.map((optGroup, gIdx) => (
                  <div key={gIdx}>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-2">
                      {optGroup.name}
                    </label>
                    <div className="space-y-2">
                      {optGroup.choices.map((choice, cIdx) => (
                        <label
                          key={cIdx}
                          className={`flex items-center justify-between p-2.5 rounded-sm border cursor-pointer text-xs transition-colors ${
                            currentOption === choice.label
                              ? 'bg-[#292621] border-[#c48d42] text-[#f5f2eb]'
                              : 'bg-[#181614] border-[#29251f] text-[#a8a194] hover:text-[#ded8cb]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name={`opt-${gIdx}`}
                              checked={currentOption === choice.label}
                              onChange={() => setSelectedOption(choice.label)}
                              className="accent-[#c48d42]"
                            />
                            <span>{choice.label}</span>
                          </div>
                          {choice.extraPrice > 0 && (
                            <span className="font-mono tabular-nums text-[#c48d42]">
                              +£{choice.extraPrice.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-1.5">
                Special Requests or Dietary Inquiries
              </label>
              <textarea
                rows={2}
                placeholder="e.g. No dressing, sauce on the side, allergies..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm p-3 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#26231e] bg-[#161513] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-[#1e1c19] border border-[#2e2a23] rounded-sm px-2 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-[#8f887b] hover:text-[#f5f2eb]"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold px-2 text-[#f5f2eb] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[#8f887b] hover:text-[#f5f2eb]"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#12100d] bg-[#c48d42] hover:bg-[#d9a254] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to WhatsApp Order · £{(item.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
