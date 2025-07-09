"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import AuctionItem from "@/components/Common/AuctionItem";
import { Auction } from "@/types/product";

const AuctionsPage = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filter, setFilter] = useState('all'); // all, active, upcoming, ended
  const [sortBy, setSortBy] = useState('ending'); // ending, price, bids

  // Mock auctions data
  const mockAuctions: Auction[] = [
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
        status: 'upcoming',
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
    }
  ];

  useEffect(() => {
    setAuctions(mockAuctions);
  }, []);

  const filteredAuctions = auctions.filter(auction => {
    switch (filter) {
      case 'active':
        return auction.product.status === 'active';
      case 'upcoming':
        return auction.product.status === 'upcoming';
      case 'ended':
        return auction.product.status === 'ended';
      default:
        return true;
    }
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'ending':
        return new Date(a.product.endTime).getTime() - new Date(b.product.endTime).getTime();
      case 'price':
        return b.currentHighestBid - a.currentHighestBid;
      case 'bids':
        return b.totalBids - a.totalBids;
      default:
        return 0;
    }
  });

  return (
    <>
      <Breadcrumb title="Auctions" pages={["Auctions"]} />
      
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7.5">
            <div>
              <h1 className="font-medium text-dark text-2xl mb-2">Live Auctions</h1>
              <p className="text-gray-6">Discover unique items and place your bids</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-3 rounded-lg bg-white focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
              >
                <option value="all">All Auctions</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="ended">Ended</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-3 rounded-lg bg-white focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
              >
                <option value="ending">Ending Soon</option>
                <option value="price">Highest Price</option>
                <option value="bids">Most Bids</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          {sortedAuctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAuctions.map((auction) => (
                <AuctionItem key={auction.id} auction={auction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-dark mb-2">No auctions found</h3>
              <p className="text-gray-6">Try adjusting your filters or check back later for new auctions.</p>
            </div>
          )}

          {/* Load More Button */}
          {sortedAuctions.length > 0 && (
            <div className="text-center mt-10">
              <button className="bg-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-dark transition-colors duration-200">
                Load More Auctions
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AuctionsPage; 