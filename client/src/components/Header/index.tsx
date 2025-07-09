"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const watchedAuctions = useAppSelector((state) => state.auctionReducer.watchedAuctions);
  const myBids = useAppSelector((state) => state.auctionReducer.myBids);
  const { user, signOut } = useAuth();

  const handleOpenWatchedModal = () => {
    // TODO: Implement watched auctions modal
  };

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  const options = [
    { label: "All Categories", value: "0" },
    { label: "Watches", value: "1" },
    { label: "Antiques", value: "2" },
    { label: "Art", value: "3" },
    { label: "Jewelry", value: "4" },
    { label: "Wine", value: "5" },
    { label: "Sports", value: "6" },
    { label: "Furniture", value: "7" },
  ];

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        {/* <!-- Main Header Section --> */}
        <div
          className={`flex items-center justify-between py-4 ${
            stickyMenu ? "py-3" : "py-4"
          }`}
        >
          {/* <!-- Logo --> */}
          <Link className="flex-shrink-0" href="/">
            <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={219}
              height={36}
            />
          </Link>

          {/* <!-- Search Bar --> */}
          <div className="flex-1 max-w-[475px] mx-8">
            <form>
              <div className="flex items-center">
                <CustomSelect options={options} />
                <div className="relative flex-1">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
                  <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search auctions..."
                    autoComplete="off"
                    className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                  />
                  <button
                    id="search-btn"
                    aria-label="Search"
                    className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.25 15.75C12.3921 15.75 15.75 12.3921 15.75 8.25C15.75 4.10786 12.3921 0.75 8.25 0.75C4.10786 0.75 0.75 4.10786 0.75 8.25C0.75 12.3921 4.10786 15.75 8.25 15.75Z"
                        stroke="#495270"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.25 17.25L12.75 12.75"
                        stroke="#495270"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* <!-- User Actions --> */}
          <div className="flex items-center gap-4">
            {/* My Bids */}
            <Link
              href="/my-bids"
              className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 1L9.09 5.26H13.706L10.308 8.24L11.398 12.5L8 9.52L4.602 12.5L5.692 8.24L2.294 5.26H6.91L8 1Z" fill=""/>
              </svg>
              My Bids ({myBids.length})
            </Link>

            {/* Watched */}
            <button
              onClick={handleOpenWatchedModal}
              className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 1L9.09 5.26H13.706L10.308 8.24L11.398 12.5L8 9.52L4.602 12.5L5.692 8.24L2.294 5.26H6.91L8 1Z" fill=""/>
              </svg>
              Watched ({watchedAuctions.length})
            </button>

            {/* User Account */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                  >
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill=""/>
                    </svg>
                    {user.user_metadata?.full_name || user.email}
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-3 z-50">
                      <div className="py-2">
                        <Link
                          href="/my-account"
                          className="block px-4 py-2 text-sm text-dark hover:bg-gray-1"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/my-auctions"
                          className="block px-4 py-2 text-sm text-dark hover:bg-gray-1"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Auctions
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-red hover:bg-gray-1"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                >
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill=""/>
                  </svg>
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>


      </div>
    </header>
  );
};

export default Header;
