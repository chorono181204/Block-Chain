"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectCurrentAuction } from "@/redux/features/auction-slice";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BidForm from "@/components/Auction/BidForm";
import BidHistory from "@/components/Auction/BidHistory";
import Image from "next/image";

const AuctionDetails = () => {
  const params = useParams();
  const auctionId = parseInt(params.id as string);
  const currentAuction = useAppSelector(selectCurrentAuction);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Mock auction data - in real app this would come from API
  const mockAuction = {
    id: auctionId,
    product: {
      id: 1,
      title: "Vintage Rolex Submariner",
      description: "A rare vintage Rolex Submariner from 1965 in excellent condition. This timepiece features the original dial, hands, and bezel insert. The watch has been professionally serviced and comes with original box and papers.",
      startingPrice: 5000,
      currentBid: 7500,
      reservePrice: 6000,
      endTime: "2024-12-31T23:59:59Z",
      startTime: "2024-12-01T00:00:00Z",
      status: 'active' as const,
      bids: [
        {
          id: 1,
          amount: 7500,
          bidder: { id: 1, name: "John Doe" },
          timestamp: "2024-12-15T10:30:00Z"
        },
        {
          id: 2,
          amount: 7000,
          bidder: { id: 2, name: "Jane Smith" },
          timestamp: "2024-12-15T09:15:00Z"
        },
        {
          id: 3,
          amount: 6500,
          bidder: { id: 3, name: "Mike Johnson" },
          timestamp: "2024-12-14T16:45:00Z"
        }
      ],
      seller: {
        id: 1,
        name: "Vintage Watches Co.",
        rating: 4.8
      },
      images: {
        thumbnails: [
          "/images/products/product-1-sm-1.png",
          "/images/products/product-1-sm-2.png",
          "/images/products/product-2-sm-1.png",
          "/images/products/product-2-sm-2.png"
        ],
        previews: [
          "/images/products/product-1-bg-1.png",
          "/images/products/product-1-bg-2.png",
          "/images/products/product-2-bg-1.png",
          "/images/products/product-2-bg-2.png"
        ]
      },
      category: "Watches",
      condition: 'used' as const,
      location: "New York, NY",
      shippingInfo: {
        cost: 50,
        method: "FedEx Express"
      }
    },
    currentHighestBid: 7500,
    totalBids: 3,
    timeLeft: "15d 12h 30m 45s",
    isWatched: false
  };

  const [auction, setAuction] = useState(mockAuction);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBidSuccess = () => {
    // Update auction data after successful bid
    setAuction(prev => ({
      ...prev,
      currentHighestBid: prev.currentHighestBid + 100,
      totalBids: prev.totalBids + 1
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTimeLeft = () => {
    if (!isClient) return auction.timeLeft;
    
    const now = new Date().getTime();
    const endTime = new Date(auction.product.endTime).getTime();
    const distance = endTime - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return "Ended";
  };

  return (
    <>
      <Breadcrumb title={auction.product.title} pages={["Auctions", auction.product.title]} />
      
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* Left Column - Images */}
            <div className="lg:max-w-[570px] w-full">
              <div className="bg-white rounded-[10px] shadow-1 p-4">
                {/* Main Image */}
                <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={auction.product.images.previews[selectedImage]}
                    alt={auction.product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  {auction.product.images.thumbnails.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === index ? 'border-blue' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${auction.product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex-1">
              <div className="bg-white rounded-[10px] shadow-1 p-6">
                <h1 className="text-2xl font-medium text-dark mb-4">
                  {auction.product.title}
                </h1>

                <p className="text-gray-6 mb-6">
                  {auction.product.description}
                </p>

                {/* Auction Status */}
                <div className="mb-6 p-4 bg-blue-light-5 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-6">Current Bid:</span>
                      <p className="font-medium text-green text-xl">${auction.currentHighestBid}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-6">Starting Price:</span>
                      <p className="font-medium text-dark">${auction.product.startingPrice}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-6">Total Bids:</span>
                      <p className="font-medium text-dark">{auction.totalBids}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-6">Time Left:</span>
                      <p className="font-medium text-red">{getTimeLeft()}</p>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="mb-6 p-4 bg-gray-1 rounded-lg">
                  <h3 className="font-medium text-dark mb-2">Seller Information</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark">{auction.product.seller.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow">★</span>
                        <span className="text-sm text-gray-6">{auction.product.seller.rating}</span>
                      </div>
                    </div>
                    <button className="text-blue hover:text-blue-dark text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Item Details */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3">Item Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-6">Category:</span>
                      <p className="font-medium text-dark">{auction.product.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-6">Condition:</span>
                      <p className="font-medium text-dark capitalize">{auction.product.condition}</p>
                    </div>
                    <div>
                      <span className="text-gray-6">Location:</span>
                      <p className="font-medium text-dark">{auction.product.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-6">Shipping:</span>
                      <p className="font-medium text-dark">${auction.product.shippingInfo.cost}</p>
                    </div>
                  </div>
                </div>

                {/* Auction Dates */}
                <div className="mb-6">
                  <h3 className="font-medium text-dark mb-3">Auction Dates</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-6">Start Date:</span>
                      <p className="font-medium text-dark">{formatDate(auction.product.startTime)}</p>
                    </div>
                    <div>
                      <span className="text-gray-6">End Date:</span>
                      <p className="font-medium text-dark">{formatDate(auction.product.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Bid Form and History */}
          <div className="mt-7.5 grid grid-cols-1 lg:grid-cols-2 gap-7.5">
            <BidForm auction={auction} onBidSuccess={handleBidSuccess} />
            <BidHistory auction={auction} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuctionDetails; 