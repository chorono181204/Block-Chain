"use client";
import React from "react";
import { Auction } from "@/types/product";

interface BidHistoryProps {
  auction: Auction;
}

const BidHistory: React.FC<BidHistoryProps> = ({ auction }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const sortedBids = [...auction.product.bids].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-1 p-6">
      <h3 className="text-xl font-medium text-dark mb-4">Bid History</h3>
      
      {sortedBids.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-6">No bids yet. Be the first to bid!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedBids.map((bid, index) => (
            <div
              key={bid.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                index === 0 ? 'bg-green-light-6 border border-green-light-4' : 'bg-gray-1'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-dark">
                    {bid.bidder.name}
                  </span>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-green text-white text-xs rounded-full">
                      Highest Bid
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-6">
                  {formatDate(bid.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <span className="font-medium text-lg text-dark">
                  ${bid.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-6">Total Bids:</span>
            <span className="ml-2 font-medium text-dark">{auction.totalBids}</span>
          </div>
          <div>
            <span className="text-gray-6">Starting Price:</span>
            <span className="ml-2 font-medium text-dark">${auction.product.startingPrice}</span>
          </div>
          {auction.product.reservePrice && (
            <div className="col-span-2">
              <span className="text-gray-6">Reserve Price:</span>
              <span className="ml-2 font-medium text-dark">${auction.product.reservePrice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidHistory; 