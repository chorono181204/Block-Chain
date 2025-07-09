"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBid } from "@/redux/features/auction-slice";
import { Auction, Bid } from "@/types/product";

interface BidFormProps {
  auction: Auction;
  onBidSuccess?: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ auction, onBidSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const minBid = auction.currentHighestBid + 1;
  const isActive = auction.product.status === 'active';

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amount = parseFloat(bidAmount);
    
    if (!amount || amount < minBid) {
      setError(`Bid must be at least $${minBid}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newBid: Bid = {
        id: Date.now(),
        amount: amount,
        bidder: {
          id: 1, // This would come from auth context
          name: "Current User", // This would come from auth context
        },
        timestamp: new Date().toISOString(),
      };

      dispatch(addBid({ auctionId: auction.id, bid: newBid }));
      setBidAmount("");
      onBidSuccess?.();
    } catch (err) {
      setError("Failed to place bid. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isActive) {
    return (
      <div className="bg-gray-1 rounded-lg p-4 text-center">
        <p className="text-gray-6">This auction has ended.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-1 p-6">
      <h3 className="text-xl font-medium text-dark mb-4">Place Your Bid</h3>
      
      <div className="mb-4 p-4 bg-blue-light-5 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-6">Current Highest Bid:</span>
          <span className="font-medium text-green text-lg">${auction.currentHighestBid}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-6">Minimum Bid:</span>
          <span className="font-medium text-red">${minBid}</span>
        </div>
      </div>

      <form onSubmit={handleBidSubmit}>
        <div className="mb-4">
          <label htmlFor="bidAmount" className="block text-sm font-medium text-dark mb-2">
            Your Bid Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-6">$</span>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={minBid}
              step="0.01"
              placeholder={`${minBid}`}
              className="w-full pl-8 pr-4 py-3 border border-gray-3 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
          {error && (
            <p className="text-red text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !bidAmount}
          className="w-full bg-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-dark disabled:bg-gray-3 disabled:text-gray-6 transition-all duration-200"
        >
          {isSubmitting ? "Placing Bid..." : "Place Bid"}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-6">
        <p>• By placing a bid, you agree to purchase this item if you win.</p>
        <p>• Bids are binding and cannot be retracted.</p>
        <p>• You will be notified if you are outbid.</p>
      </div>
    </div>
  );
};

export default BidForm; 