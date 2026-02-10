

export type Tab = 'home' | 'garage' | 'parts' | 'lubricants' | 'car-bidding' | 'bidding' | 'community' | 'maintenance' | 'ai' | 'news';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  mileage: number;
  plate: string;
  lastService: string;
}

export interface CarModel {
  brand: 'Perodua' | 'Proton' | 'Honda' | 'Toyota' | 'Other';
  name: string;
  year: string;
}

export interface SparePart {
  id: string;
  name: string;
  brand: string;
  category: 'Engine' | 'Suspension' | 'Interior' | 'Exterior' | 'Electronics';
  price: number;
  image: string;
  compatibility: string[];
  condition: 'New' | 'Used';
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: 'Breakdown' | 'Performance' | 'Modification' | 'Accessories';
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  image?: string;
}

export interface AuctionItem {
  id: string;
  title: string;
  currentBid: number;
  timeLeft: string;
  image: string;
  bidsCount: number;
  seller: string;
}