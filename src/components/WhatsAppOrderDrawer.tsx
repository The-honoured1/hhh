import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ShoppingBag,
  Clock,
  MapPin,
  Utensils,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { CartItem, OrderType, OrderCustomerDetails } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [customerDetails, setCustomerDetails] = useState<OrderCustomerDetails>({
    fullName: '',
    phone: '',
    orderType: 'pickup',
    tableNumber: '',
    deliveryAddress: '',
    preferredTime: 'As soon as ready (approx 25-35 min)',
    notes: '',
  });
  const [orderSent, setOrderSent] = useState(false);

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => {
    let price = item.menuItem.price;
    // Extra options price calculation if present
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? 4.5 : 0;
  const total = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    // Generate clean itemized WhatsApp message
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    let msg = `*NEW ORDER #${orderNum} - ${RESTAURANT_INFO.name.toUpperCase()}*\n`;
    msg += `📅 Date: ${dateStr}\n`;
    msg += `🍴 Order Type: ${
      orderType === 'dine-in'
        ? `Table Dine-in (Table #${customerDetails.tableNumber || 'Unassigned'})`
        : orderType === 'delivery'
        ? `Direct Courier Delivery`
        : `Takeaway / Curbside Pickup`
    }\n\n`;

    msg += `*GUEST DETAILS:*\n`;
    msg += `👤 Name: ${customerDetails.fullName || 'Guest'}\n`;
    if (customerDetails.phone) msg += `📞 Phone: ${customerDetails.phone}\n`;
    if (orderType === 'delivery' && customerDetails.deliveryAddress) {
      msg += `📍 Delivery Address: ${customerDetails.deliveryAddress}\n`;
    }
    if (customerDetails.preferredTime) {
      msg += `⏰ Preferred Time: ${customerDetails.preferredTime}\n`;
    }
    if (customerDetails.notes) {
      msg += `📝 Special Notes / Allergies: ${customerDetails.notes}\n`;
    }

    msg += `\n*ITEMS ORDERED:*\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.menuItem.name}* x ${item.quantity}\n`;
      msg += `   Price: £${(item.menuItem.price * item.quantity).toFixed(2)}\n`;
      if (item.selectedOption) {
        msg += `   Option: ${item.selectedOption}\n`;
      }
      if (item.specialInstructions) {
        msg += `   Note: ${item.specialInstructions}\n`;
      }
    });

    msg += `\n*FINANCIAL SUMMARY:*\n`;
    msg += `Subtotal: £${subtotal.toFixed(2)}\n`;
    if (deliveryFee > 0) {
      msg += `Delivery Fee: £${deliveryFee.toFixed(2)}\n`;
    }
    msg += `*TOTAL: £${total.toFixed(2)}*\n\n`;
    msg += `Please confirm receipt and estimated prep time. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-drawer-title"
          className="w-screen max-w-md bg-[#141311] border-l border-[#2e2a24] shadow-2xl flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#26231e] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#25D366]/20 rounded-sm">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h2 id="order-drawer-title" className="text-base font-serif text-[#f5f2eb]">
                  WhatsApp Order Cart
                </h2>
                <p className="text-[11px] text-[#9c9587]">
                  Direct kitchen transmission · Zero commissions
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8f887b] hover:text-[#f5f2eb] rounded-sm hover:bg-[#201e19]"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {orderSent ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#25D366] mx-auto animate-bounce" />
                <h3 className="text-xl font-serif text-[#f5f2eb]">
                  Order Dispatched to WhatsApp!
                </h3>
                <p className="text-xs text-[#a8a194] leading-relaxed max-w-xs mx-auto">
                  Your WhatsApp message with full itemized details has been prepared. Our host will confirm your order in chat shortly.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setOrderSent(false);
                      onClearCart();
                      onClose();
                    }}
                    className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#14120e] bg-[#c48d42] hover:bg-[#d9a254] rounded-sm"
                  >
                    Start New Order
                  </button>
                  <button
                    onClick={() => setOrderSent(false)}
                    className="py-2 text-xs text-[#a8a194] hover:text-white"
                  >
                    Return to Cart View
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#38332b] mx-auto" />
                <p className="text-sm font-medium text-[#c4beb3]">Your order is currently empty</p>
                <p className="text-xs text-[#7d7568] max-w-xs mx-auto">
                  Explore our Hearth Starters, 45-day dry-aged steaks, and truffle pastas to add dishes.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#c48d42] hover:text-[#d9a254]"
                >
                  <span>Browse Autumn Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Fulfillment Type Switcher */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold mb-2">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#1b1916] rounded-sm border border-[#2b2721]">
                    <button
                      type="button"
                      onClick={() => {
                        setOrderType('pickup');
                        setCustomerDetails({ ...customerDetails, orderType: 'pickup' });
                      }}
                      className={`py-2 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                        orderType === 'pickup'
                          ? 'bg-[#c48d42] text-[#14120e]'
                          : 'text-[#9c9587] hover:text-white'
                      }`}
                    >
                      Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOrderType('delivery');
                        setCustomerDetails({ ...customerDetails, orderType: 'delivery' });
                      }}
                      className={`py-2 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-[#c48d42] text-[#14120e]'
                          : 'text-[#9c9587] hover:text-white'
                      }`}
                    >
                      Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOrderType('dine-in');
                        setCustomerDetails({ ...customerDetails, orderType: 'dine-in' });
                      }}
                      className={`py-2 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                        orderType === 'dine-in'
                          ? 'bg-[#c48d42] text-[#14120e]'
                          : 'text-[#9c9587] hover:text-white'
                      }`}
                    >
                      Table Order
                    </button>
                  </div>
                </div>

                {/* Itemized List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold pb-1 border-b border-[#24211b]">
                    <span>Items ({cart.length})</span>
                    <button
                      onClick={onClearCart}
                      className="text-[#964242] hover:text-[#d15858] transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="divide-y divide-[#24211b] max-h-56 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-start justify-between gap-3 text-xs">
                        <div className="flex-1">
                          <p className="font-medium text-[#f5f2eb]">{item.menuItem.name}</p>
                          {item.selectedOption && (
                            <p className="text-[11px] text-[#c48d42] mt-0.5">
                              {item.selectedOption}
                            </p>
                          )}
                          {item.specialInstructions && (
                            <p className="text-[11px] text-[#8a8376] italic mt-0.5">
                              “{item.specialInstructions}”
                            </p>
                          )}
                          <p className="font-mono text-[#c4beb3] mt-1 tabular-nums">
                            £{(item.menuItem.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-1.5 bg-[#1f1d19] border border-[#2e2a23] rounded-sm px-1.5 py-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="p-0.5 text-[#9c9587] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-semibold px-1 text-[#f5f2eb] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-0.5 text-[#9c9587] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(idx)}
                            className="ml-1 p-0.5 text-[#733636] hover:text-[#c45252]"
                            title="Remove item"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guest Details Form */}
                <form id="whatsapp-order-form" onSubmit={handleSendWhatsAppOrder} className="space-y-3 pt-2 border-t border-[#24211b]">
                  <p className="text-[11px] uppercase tracking-wider text-[#9c9587] font-semibold">
                    Guest & Dispatch Information
                  </p>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={customerDetails.fullName}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, fullName: e.target.value })
                      }
                      className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Phone (for order confirmation)"
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, phone: e.target.value })
                      }
                      className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                    />
                  </div>

                  {orderType === 'dine-in' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Table Number (e.g., Table 12 or Hearth 4)"
                        value={customerDetails.tableNumber}
                        onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, tableNumber: e.target.value })
                        }
                        className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                      />
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Delivery Address & Postal Code *"
                        value={customerDetails.deliveryAddress}
                        onChange={(e) =>
                          setCustomerDetails({ ...customerDetails, deliveryAddress: e.target.value })
                        }
                        className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                      />
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Preferred Time (e.g., Today 19:30 or ASAP)"
                      value={customerDetails.preferredTime}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, preferredTime: e.target.value })
                      }
                      className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42]"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Special dietary requests, allergies, or cutlery notes..."
                      value={customerDetails.notes}
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, notes: e.target.value })
                      }
                      className="w-full bg-[#1b1916] border border-[#2b2721] rounded-sm px-3 py-2 text-xs text-[#f5f2eb] placeholder-[#6e685d] focus:outline-none focus:border-[#c48d42] resize-none"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {!orderSent && cart.length > 0 && (
            <div className="p-5 border-t border-[#26231e] bg-[#171613] space-y-3">
              <div className="space-y-1.5 text-xs text-[#a39c8e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#f5f2eb]">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Local Courier Delivery</span>
                    <span className="font-mono tabular-nums text-[#f5f2eb]">
                      £{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-[#f5f2eb] pt-2 border-t border-[#2a261f]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-[#c48d42] text-base">
                    £{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="whatsapp-order-form"
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#101912] bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Order via WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#7d7568]">
                Clicking opens WhatsApp with your pre-formatted order summary ready to send.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// Floating WhatsApp Action Button component
export const WhatsAppFloatingButton: React.FC<{
  cartCount: number;
  onOpen: () => void;
}> = ({ cartCount, onOpen }) => {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
      <button
        onClick={onOpen}
        aria-label="Open WhatsApp ordering"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#0f1f14] font-semibold text-xs uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-bold">Order on WhatsApp</span>
        {cartCount > 0 && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-bold text-white bg-[#111b13] rounded-full tabular-nums">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </button>
    </div>
  );
};
