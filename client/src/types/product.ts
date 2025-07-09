export type Product = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  reservePrice?: number;
  endTime: string; // ISO date string
  startTime: string; // ISO date string
  status: 'upcoming' | 'active' | 'ended' | 'sold';
  bids: Bid[];
  seller: {
    id: number;
    name: string;
    rating: number;
  };
  images: {
    thumbnails: string[];
    previews: string[];
  };
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  location: string;
  shippingInfo: {
    cost: number;
    method: string;
  };
};

export type Bid = {
  id: number;
  amount: number;
  bidder: {
    id: number;
    name: string;
  };
  timestamp: string;
};

export type Auction = {
  id: number;
  product: Product;
  currentHighestBid: number;
  totalBids: number;
  timeLeft: string; // formatted time remaining
  isWatched: boolean;
};
