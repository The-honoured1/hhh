import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Check, SlidersHorizontal, Info } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/restaurantData';
import type { MenuItem, DietaryPreference } from '../types/restaurant';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, option?: string, instructions?: string) => void;
  onOpenDishDetail: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenDishDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!item.dietary || !item.dietary.includes(selectedDietary as DietaryPreference)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesPairing = item.pairingNote?.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesPairing;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 bg-[#121110] border-t border-[#24211c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c48d42] font-semibold mb-2">
            The Autumn Hearth Collection
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#f5f2eb] tracking-tight mb-4">
            Seasonal Tasting & Hearth Menu
          </h2>
          <p className="text-sm text-[#aba496] leading-relaxed">
            Every dish is cooked over red oak, olive wood, or hand-rolled daily in our open kitchen.
            Select any dish to order directly via WhatsApp or customize table-side.
          </p>
        </div>

        {/* Filter Controls: Interactive segmented controls */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#c48d42] text-[#12100d] shadow-sm'
                      : 'bg-[#1c1a17] text-[#c2bcaf] hover:text-[#f5f2eb] hover:bg-[#25221d] border border-[#2f2b24]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-bar: Search & Dietary Preferences */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            {/* Dietary Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none text-xs">
              <span className="text-[#878072] uppercase tracking-wider text-[11px] mr-2 shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Preferences' },
                { id: 'Chef Signature', label: "Chef's Signatures" },
                { id: 'Vegetarian', label: 'Vegetarian' },
                { id: 'Gluten-Free', label: 'Gluten-Free' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDietary(d.id)}
                  className={`px-3 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                    selectedDietary === d.id
                      ? 'bg-[#292621] text-[#f5f2eb] border border-[#524b3f]'
                      : 'bg-transparent text-[#9c9485] hover:text-[#ded8cb] border border-transparent'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8a8376] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish, truffle, steak..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181614] border border-[#2e2a24] text-xs text-[#f5f2eb] rounded-sm pl-9 pr-3 py-2 placeholder-[#706b60] focus:outline-none focus:border-[#c48d42] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8a8376] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#161513] rounded-sm border border-[#2a2620]">
            <p className="text-[#a8a194] text-sm mb-3">No dishes match your current filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-wider text-[#c48d42] underline hover:text-[#d9a254]"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => {
              const isJustAdded = justAddedId === dish.id;

              return (
                <article
                  key={dish.id}
                  onClick={() => onOpenDishDetail(dish)}
                  className="group flex flex-col justify-between bg-[#171614] border border-[#2a2721] rounded-sm p-5 hover:border-[#423c31] hover:bg-[#1c1a17] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Visual Asset if exists or clean culinary header */}
                    {dish.image ? (
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-sm bg-[#22201c]">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-transparent to-transparent" />
                      </div>
                    ) : null}

                    {/* Clean unboxed metadata (NO PILL BADGES) */}
                    {dish.dietary && dish.dietary.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#9c9485] mb-2 font-medium">
                        {dish.dietary.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span className={tag === 'Chef Signature' ? 'text-[#c48d42]' : ''}>
                              {tag}
                            </span>
                            {idx < dish.dietary!.length - 1 && (
                              <span aria-hidden="true" className="text-[#595347]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Dish Title & Price Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-serif text-[#f5f2eb] group-hover:text-[#c48d42] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-base font-semibold text-[#f5f2eb] tabular-nums shrink-0 pt-0.5">
                        £{dish.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Dish Description */}
                    <p className="text-xs text-[#a39c8f] leading-relaxed mb-4 line-clamp-3 font-light">
                      {dish.description}
                    </p>

                    {/* Pairing note */}
                    {dish.pairingNote && (
                      <p className="text-[11px] text-[#80796c] italic mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#c48d42] shrink-0" />
                        <span>Pairing: {dish.pairingNote}</span>
                      </p>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-[#26231d] flex items-center justify-between gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDishDetail(dish);
                      }}
                      className="text-[11px] text-[#b0a99c] hover:text-[#f5f2eb] font-medium flex items-center gap-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details & Pairing</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(dish, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                        isJustAdded
                          ? 'bg-[#25D366] text-white'
                          : 'bg-[#26231e] text-[#f5f2eb] hover:bg-[#c48d42] hover:text-[#12100d] border border-[#38332a]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* WhatsApp direct order tip */}
        <div className="mt-14 p-6 bg-[#161512] border border-[#2d2922] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-serif text-[#f5f2eb] mb-1">
              Custom Dietary Inquiries or Cellar Pairings?
            </h4>
            <p className="text-xs text-[#9c9587]">
              Message our kitchen & sommelier team directly on WhatsApp for private bespoke menus or allergen adaptations.
            </p>
          </div>
          <a
            href="https://wa.me/447946089200?text=Hello%20Ember%20%26%20Thyme%2C%20I%20have%20a%20question%20about%20your%20menu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#12100d] bg-[#25D366] hover:bg-[#20ba5a] transition-colors rounded-sm whitespace-nowrap shrink-0 shadow-sm"
          >
            Chat with Sommelier
          </a>
        </div>
      </div>
    </section>
  );
};
