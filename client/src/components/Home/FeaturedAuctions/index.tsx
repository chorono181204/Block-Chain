"use client";
import React from "react";
import AuctionItem from "@/components/Common/AuctionItem";
import { Auction } from "@/types/product";

const FeaturedAuctions = () => {
  // Mock featured auctions data
  const featuredAuctions: Auction[] = [
    {
      id: 5,
      product: {
        id: 5,
        title: "Diamond Engagement Ring",
        description: "Stunning 3-carat diamond engagement ring in platinum setting.",
        startingPrice: 15000,
        currentBid: 22000,
        reservePrice: 18000,
        endTime: "2024-12-20T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 5, name: "Luxury Jewelers", rating: 4.9 },
        images: {
          thumbnails: ["/images/products/product-5-sm-1.png"],
          previews: ["/images/products/product-5-bg-1.png"]
        },
        category: "Jewelry",
        condition: 'new',
        location: "Beverly Hills, CA",
        shippingInfo: { cost: 500, method: "Secure Jewelry Shipping" }
      },
      currentHighestBid: 22000,
      totalBids: 12,
      timeLeft: "5d 8h 30m 15s",
      isWatched: false
    },
    {
      id: 6,
      product: {
        id: 6,
        title: "Vintage Wine Collection",
        description: "Rare collection of vintage wines from the 1980s.",
        startingPrice: 5000,
        currentBid: 8500,
        reservePrice: 7000,
        endTime: "2024-12-22T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 6, name: "Wine Cellar", rating: 4.8 },
        images: {
          thumbnails: ["/images/products/product-6-sm-1.png"],
          previews: ["/images/products/product-6-bg-1.png"]
        },
        category: "Wine",
        condition: 'used',
        location: "Napa Valley, CA",
        shippingInfo: { cost: 300, method: "Temperature Controlled" }
      },
      currentHighestBid: 8500,
      totalBids: 7,
      timeLeft: "7d 12h 45m 30s",
      isWatched: false
    },
    {
      id: 7,
      product: {
        id: 7,
        title: "Sports Memorabilia",
        description: "Signed baseball from the 1956 World Series.",
        startingPrice: 3000,
        currentBid: 5200,
        reservePrice: 4000,
        endTime: "2024-12-18T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 7, name: "Sports Collectibles", rating: 4.7 },
        images: {
          thumbnails: ["/images/products/product-7-sm-1.png"],
          previews: ["/images/products/product-7-bg-1.png"]
        },
        category: "Sports",
        condition: 'used',
        location: "Cooperstown, NY",
        shippingInfo: { cost: 100, method: "Secure Collectibles" }
      },
      currentHighestBid: 5200,
      totalBids: 15,
      timeLeft: "3d 6h 20m 45s",
      isWatched: false
    },
    {
      id: 8,
      product: {
        id: 8,
        title: "Antique Furniture Set",
        description: "Complete Victorian era furniture set in mahogany.",
        startingPrice: 8000,
        currentBid: 12500,
        reservePrice: 10000,
        endTime: "2024-12-25T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 8, name: "Antique Furniture Co.", rating: 4.6 },
        images: {
          thumbnails: ["/images/products/product-8-sm-1.png"],
          previews: ["/images/products/product-8-bg-1.png"]
        },
        category: "Furniture",
        condition: 'used',
        location: "Charleston, SC",
        shippingInfo: { cost: 800, method: "Professional Moving" }
      },
      currentHighestBid: 12500,
      totalBids: 6,
      timeLeft: "10d 14h 10m 25s",
      isWatched: false
    }
  ];

  return (
    <section className="overflow-hidden py-20 bg-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10 16.6667C6.325 16.6667 3.33333 13.675 3.33333 10C3.33333 6.325 6.325 3.33333 10 3.33333C13.675 3.33333 16.6667 6.325 16.6667 10C16.6667 13.675 13.675 16.6667 10 16.6667Z"
                  fill="#3C50E0"
                />
                <path
                  d="M10 5.83333C9.54167 5.83333 9.16667 6.20833 9.16667 6.66667V10C9.16667 10.4583 9.54167 10.8333 10 10.8333C10.4583 10.8333 10.8333 10.4583 10.8333 10V6.66667C10.8333 6.20833 10.4583 5.83333 10 5.83333Z"
                  fill="#3C50E0"
                />
              </svg>
              Featured
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Featured Auctions
            </h2>
            <p className="text-gray-6 mt-2">
              Premium items with high bidding activity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionItem key={auction.id} auction={auction} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/auctions"
            className="inline-flex items-center justify-center bg-dark text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
          >
            Explore All Featured Items
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions; 