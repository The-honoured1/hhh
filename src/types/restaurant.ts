export type DietaryPreference = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Signature';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'pastas' | 'desserts' | 'drinks';
  description: string;
  price: number;
  dietary?: DietaryPreference[];
  image?: string;
  prepTime?: string;
  calories?: number;
  pairingNote?: string;
  customOptions?: {
    name: string;
    choices: { label: string; extraPrice: number }[];
  }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  specialInstructions?: string;
}

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ReservationDetails {
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  partySize: number;
  seatingArea: 'Dining Room' | "Chef's Hearth Counter" | 'Botanical Garden Terrace';
  specialOccasion?: string;
  dietaryNotes?: string;
}
