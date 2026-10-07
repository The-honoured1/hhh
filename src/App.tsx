/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import {
  WhatsAppOrderDrawer,
  WhatsAppFloatingButton,
} from './components/WhatsAppOrderDrawer';
import { ReservationModal } from './components/ReservationModal';
import { DishDetailModal } from './components/DishDetailModal';
import type { CartItem, MenuItem } from './types/restaurant';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);

  // Cart total item count
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    item: MenuItem,
    option?: string,
    instructions?: string
  ) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedOption === option &&
          ci.specialInstructions === instructions
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            menuItem: item,
            quantity: 1,
            selectedOption: option,
            specialInstructions: instructions,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCart((prevCart) => {
        const updated = [...prevCart];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#e8e4de] selection:bg-[#c48d42]/30 selection:text-[#f8f5f0] flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 2. Menu Section */}
        <MenuSection
          onAddToCart={(item) => handleAddToCart(item)}
          onOpenDishDetail={(item) => setSelectedDishDetail(item)}
        />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Location & Hours Section */}
        <LocationHoursSection
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 5. WhatsApp Floating Action Button */}
      <WhatsAppFloatingButton
        cartCount={cartItemCount}
        onOpen={() => setIsCartOpen(true)}
      />

      {/* WhatsApp Order Drawer / Cart */}
      <WhatsAppOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        item={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
