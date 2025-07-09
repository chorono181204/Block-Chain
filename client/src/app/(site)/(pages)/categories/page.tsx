"use client";
import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import Image from "next/image";

const CategoriesPage = () => {
  const categories = [
    {
      id: 1,
      name: "Watches",
      image: "/images/categories/categories-01.png",
      count: 45,
      description: "Luxury timepieces and vintage watches"
    },
    {
      id: 2,
      name: "Antiques",
      image: "/images/categories/categories-02.png",
      count: 32,
      description: "Rare antiques and collectibles"
    },
    {
      id: 3,
      name: "Art",
      image: "/images/categories/categories-03.png",
      count: 28,
      description: "Fine art and paintings"
    },
    {
      id: 4,
      name: "Jewelry",
      image: "/images/categories/categories-04.png",
      count: 56,
      description: "Precious jewelry and gemstones"
    },
    {
      id: 5,
      name: "Wine",
      image: "/images/categories/categories-05.png",
      count: 18,
      description: "Rare wines and spirits"
    },
    {
      id: 6,
      name: "Sports",
      image: "/images/categories/categories-06.png",
      count: 23,
      description: "Sports memorabilia and equipment"
    },
    {
      id: 7,
      name: "Furniture",
      image: "/images/categories/categories-07.png",
      count: 34,
      description: "Antique furniture and decor"
    },
    {
      id: 8,
      name: "Electronics",
      image: "/images/categories/categories-01.png",
      count: 41,
      description: "Vintage electronics and gadgets"
    }
  ];

  return (
    <>
      <Breadcrumb title="Categories" pages={["Categories"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-dark mb-4">
              Auction Categories
            </h1>
            <p className="text-gray-6 max-w-2xl mx-auto">
              Discover unique items across various categories. From luxury watches to rare antiques, 
              find the perfect piece for your collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/auctions?category=${category.name.toLowerCase()}`}
                className="group bg-white rounded-lg shadow-1 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-dark mb-2 group-hover:text-blue transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-6 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-6">
                      {category.count} auctions
                    </span>
                    <svg
                      className="w-4 h-4 text-blue group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-light-6 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-dark mb-4">
                Want to Sell Your Items?
              </h2>
              <p className="text-gray-6 mb-6">
                Join thousands of sellers who trust our platform to auction their valuable items. 
                Get started today and reach a global audience of collectors and enthusiasts.
              </p>
              <Link
                href="/create-auction"
                className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-dark transition-colors"
              >
                Create Auction
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage; 