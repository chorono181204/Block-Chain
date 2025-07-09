"use client";
import React from "react";
import AuctionItem from "@/components/Common/AuctionItem";
import { Auction } from "@/types/product";

const LiveAuctions = () => {
  // Mock live auctions data
  const liveAuctions: Auction[] = [
    {
      id: 1,
      product: {
        id: 1,
        title: "Vintage Rolex Submariner",
        description: "A rare vintage Rolex Submariner from 1965 in excellent condition.",
        startingPrice: 5000,
        currentBid: 7500,
        reservePrice: 6000,
        endTime: "2024-12-31T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 1, name: "Vintage Watches Co.", rating: 4.8 },
        images: {
          thumbnails: ["/images/products/product-1-sm-1.png"],
          previews: ["/images/products/product-1-bg-1.png"]
        },
        category: "Watches",
        condition: 'used',
        location: "New York, NY",
        shippingInfo: { cost: 50, method: "FedEx Express" }
      },
      currentHighestBid: 7500,
      totalBids: 3,
      timeLeft: "15d 12h 30m 45s",
      isWatched: false
    },
    {
      id: 2,
      product: {
        id: 2,
        title: "Antique Persian Rug",
        description: "Beautiful hand-woven Persian rug from the 19th century.",
        startingPrice: 2000,
        currentBid: 3200,
        reservePrice: 2500,
        endTime: "2024-12-25T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 2, name: "Antique Gallery", rating: 4.9 },
        images: {
          thumbnails: ["/images/products/product-2-sm-1.png"],
          previews: ["/images/products/product-2-bg-1.png"]
        },
        category: "Antiques",
        condition: 'used',
        location: "Los Angeles, CA",
        shippingInfo: { cost: 150, method: "Freight" }
      },
      currentHighestBid: 3200,
      totalBids: 5,
      timeLeft: "10d 8h 15m 30s",
      isWatched: false
    },
    {
      id: 3,
      product: {
        id: 3,
        title: "Modern Art Painting",
        description: "Contemporary abstract painting by renowned artist.",
        startingPrice: 3000,
        currentBid: 3000,
        reservePrice: undefined,
        endTime: "2025-01-15T23:59:59Z",
        startTime: "2024-12-20T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 3, name: "Art Gallery NYC", rating: 4.7 },
        images: {
          thumbnails: ["/images/products/product-3-sm-1.png"],
          previews: ["/images/products/product-3-bg-1.png"]
        },
        category: "Art",
        condition: 'new',
        location: "New York, NY",
        shippingInfo: { cost: 100, method: "Professional Art Shipping" }
      },
      currentHighestBid: 3000,
      totalBids: 0,
      timeLeft: "30d 5h 20m 10s",
      isWatched: false
    },
    {
      id: 4,
      product: {
        id: 4,
        title: "Vintage Guitar Collection",
        description: "Rare collection of vintage guitars from the 1960s.",
        startingPrice: 8000,
        currentBid: 12000,
        reservePrice: 10000,
        endTime: "2024-12-28T23:59:59Z",
        startTime: "2024-12-01T00:00:00Z",
        status: 'active',
        bids: [],
        seller: { id: 4, name: "Music Memorabilia", rating: 4.6 },
        images: {
          thumbnails: ["/images/products/product-4-sm-1.png"],
          previews: ["/images/products/product-4-bg-1.png"]
        },
        category: "Music",
        condition: 'used',
        location: "Nashville, TN",
        shippingInfo: { cost: 200, method: "Specialized Music Shipping" }
      },
      currentHighestBid: 12000,
      totalBids: 8,
      timeLeft: "13d 6h 45m 20s",
      isWatched: false
    }
  ];

  return (
    <section className="overflow-hidden py-20 bg-gray-2">
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
              Live Now
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Live Auctions
            </h2>
            <p className="text-gray-6 mt-2">
              Bid on unique items from around the world
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {liveAuctions.map((auction) => (
            <AuctionItem key={auction.id} auction={auction} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/auctions"
            className="inline-flex items-center justify-center bg-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-dark transition-colors duration-200"
          >
            View All Auctions
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

export default LiveAuctions; 