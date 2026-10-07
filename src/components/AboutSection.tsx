import React from 'react';
import { ASSET_IMAGES, TESTIMONIALS } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0e0d0c] border-t border-[#24211c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Chapter Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#c48d42] font-semibold mb-2">
            The Philosophy & Craft
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#f5f2eb] tracking-tight leading-[1.15] mb-6">
            Where Ancient Fire Meets Botanical Stillness
          </h2>
          <p className="text-base text-[#bfb8ac] font-light leading-relaxed">
            Founded by Executive Chef Marcus Thorne in Covent Market Quarter, Ember & Thyme was built
            around a solitary conviction: true flavor lives in the raw embers of aged English hardwoods
            and the unhurried integrity of small heritage growers.
          </p>
        </div>

        {/* 2-Column Split: Story & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Chef & Kitchen Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden border border-[#2b2721] shadow-2xl bg-[#171513]">
              <img
                src={ASSET_IMAGES.chef}
                alt="Head chef plating a seasonal hearth creation at Ember & Thyme"
                className="w-full h-[460px] object-cover object-center filter contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-xs text-[#ded8cd] font-light bg-[#121110]/85 p-4 rounded-sm border border-[#2a2620] backdrop-blur-sm">
                <p className="font-serif text-sm text-[#f5f2eb] mb-1">Chef Marcus Thorne</p>
                <p className="text-[#a19a8d]">
                  “Live fire does not forgive pretense. It asks for pristine ingredients, patient heat, and total presence.”
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6 text-sm text-[#aba497] font-light leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-[#f5f2eb]">
                The Red Oak & Olive Wood Hearth
              </h3>
              <p>
                Our central hearth burns exclusively seasoned Sussex red oak and olive branch wood,
                reaching sustained temperatures up to 850°F. Without reliance on gas burners or electric
                broilers, our cooks read the flame intuitively—caramelizing dry-aged beef fats, smoking
                whole day-boat turbot on laurel branches, and blistering heirloom Romanesco.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#23201b]">
              <h3 className="text-xl font-serif text-[#f5f2eb]">
                Regenerative Soil & Foraged Botanicals
              </h3>
              <p>
                From hand-pressed olive oils pressed in single-estate groves to wild thyme gathered along
                the South Downs, our pantry changes weekly with the English hedgerows and coastal tides.
                Every dish honors the grower whose name appears on our daily board.
              </p>
            </div>

            {/* Adjacent Quantitative Proof Metrics (Section 1.H) */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#23201b]">
              <div>
                <p className="font-mono text-2xl font-bold text-[#f5f2eb] tabular-nums">850°F</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8a8376] mt-0.5">Wood-Fired Hearth</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#f5f2eb] tabular-nums">42</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8a8376] mt-0.5">Sussex & Kent Farms</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#f5f2eb] tabular-nums">180+</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8a8376] mt-0.5">Low-Intervention Wines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Critic Acclaim / Social Proof Strip */}
        <div id="cellar" className="border-t border-[#24211c] pt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c48d42] font-semibold text-center mb-8">
            Critical Accolades & Guest Notes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-[#141311] border border-[#26231e] p-6 rounded-sm flex flex-col justify-between"
              >
                <p className="text-xs text-[#cfc8bd] italic font-serif leading-relaxed mb-6 text-base">
                  “{t.quote}”
                </p>
                <div className="pt-4 border-t border-[#201e19]">
                  <p className="text-xs font-semibold text-[#f5f2eb]">{t.author}</p>
                  <p className="text-[11px] text-[#8c8477]">{t.critic}</p>
                  <p className="text-[11px] text-[#c48d42] mt-1 font-medium">{t.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
