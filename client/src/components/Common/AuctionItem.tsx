"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Auction } from "@/types/product";
import { useAppSelector } from "@/redux/store";
import { toggleWatchAuction } from "@/redux/features/auction-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface AuctionItemProps {
  auction: Auction;
}

const AuctionItem: React.FC<AuctionItemProps> = ({ auction }) => {
  const dispatch = useDispatch<AppDispatch>();
  const watchedAuctions = useAppSelector((state) => state.auctionReducer.watchedAuctions);
  const [timeLeft, setTimeLeft] = useState(auction.timeLeft);

  const isWatched = watchedAuctions.includes(auction.id);
  const isActive = auction.product.status === 'active';
  const isEnded = auction.product.status === 'ended';

  const handleToggleWatch = () => {
    dispatch(toggleWatchAuction(auction.id));
  };

  // Update countdown timer
  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(auction.product.endTime).getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft("Ended");
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [auction.product.endTime, isActive]);

  const getStatusColor = () => {
    switch (auction.product.status) {
      case 'active':
        return 'text-green';
      case 'upcoming':
        return 'text-blue';
      case 'ended':
        return 'text-red';
      default:
        return 'text-gray-6';
    }
  };

  const getStatusText = () => {
    switch (auction.product.status) {
      case 'active':
        return 'Live';
      case 'upcoming':
        return 'Upcoming';
      case 'ended':
        return 'Ended';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="group relative bg-white rounded-[10px] shadow-1 overflow-hidden hover:shadow-2 transition-all duration-300">
      {/* Watch button */}
      <button
        onClick={handleToggleWatch}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isWatched 
            ? 'bg-red text-white' 
            : 'bg-white/80 text-gray-6 hover:bg-red hover:text-white'
        }`}
      >
        <svg
          className="w-4 h-4"
          fill={isWatched ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Status badge */}
      <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()} bg-white/90`}>
        {getStatusText()}
      </div>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={auction.product.images.thumbnails[0]}
          alt={auction.product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/auction/${auction.id}`}>
          <h3 className="font-medium text-dark text-lg mb-2 hover:text-blue transition-colors duration-200">
            {auction.product.title}
          </h3>
        </Link>

        <p className="text-gray-6 text-sm mb-3 line-clamp-2">
          {auction.product.description}
        </p>

        {/* Price and Bid Info */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-6">Starting Price:</span>
            <span className="font-medium text-dark">${auction.product.startingPrice}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-6">Current Bid:</span>
            <span className="font-medium text-green">${auction.currentHighestBid}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-6">Total Bids:</span>
            <span className="font-medium text-dark">{auction.totalBids}</span>
          </div>
        </div>

        {/* Time Left */}
        <div className="border-t border-gray-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-6">Time Left:</span>
            <span className={`font-medium ${isActive ? 'text-red' : 'text-dark'}`}>
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            href={`/auction/${auction.id}`}
            className={`w-full block text-center py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-blue text-white hover:bg-blue-dark'
                : 'bg-gray-3 text-dark hover:bg-gray-4'
            }`}
          >
            {isActive ? 'Place Bid' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem; 