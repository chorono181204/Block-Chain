import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Auction, Bid } from "@/types/product";

type InitialState = {
  auctions: Auction[];
  watchedAuctions: number[];
  myBids: Bid[];
  currentAuction: Auction | null;
};

const initialState: InitialState = {
  auctions: [],
  watchedAuctions: [],
  myBids: [],
  currentAuction: null,
};

export const auction = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setAuctions: (state, action: PayloadAction<Auction[]>) => {
      state.auctions = action.payload;
    },
    
    addAuction: (state, action: PayloadAction<Auction>) => {
      state.auctions.push(action.payload);
    },
    
    updateAuction: (state, action: PayloadAction<{ id: number; updates: Partial<Auction> }>) => {
      const { id, updates } = action.payload;
      const auction = state.auctions.find(a => a.id === id);
      if (auction) {
        Object.assign(auction, updates);
      }
    },
    
    addBid: (state, action: PayloadAction<{ auctionId: number; bid: Bid }>) => {
      const { auctionId, bid } = action.payload;
      const auction = state.auctions.find(a => a.id === auctionId);
      if (auction) {
        auction.product.bids.push(bid);
        auction.currentHighestBid = bid.amount;
        auction.totalBids += 1;
      }
      state.myBids.push(bid);
    },
    
    toggleWatchAuction: (state, action: PayloadAction<number>) => {
      const auctionId = action.payload;
      const index = state.watchedAuctions.indexOf(auctionId);
      if (index > -1) {
        state.watchedAuctions.splice(index, 1);
      } else {
        state.watchedAuctions.push(auctionId);
      }
    },
    
    setCurrentAuction: (state, action: PayloadAction<Auction | null>) => {
      state.currentAuction = action.payload;
    },
    
    updateAuctionTime: (state, action: PayloadAction<{ id: number; timeLeft: string }>) => {
      const { id, timeLeft } = action.payload;
      const auction = state.auctions.find(a => a.id === id);
      if (auction) {
        auction.timeLeft = timeLeft;
      }
    },
  },
});

// Selectors
export const selectAuctions = (state: RootState) => state.auctionReducer.auctions;
export const selectWatchedAuctions = (state: RootState) => state.auctionReducer.watchedAuctions;
export const selectMyBids = (state: RootState) => state.auctionReducer.myBids;
export const selectCurrentAuction = (state: RootState) => state.auctionReducer.currentAuction;

export const selectActiveAuctions = createSelector(
  [selectAuctions],
  (auctions) => auctions.filter(a => a.product.status === 'active')
);

export const selectUpcomingAuctions = createSelector(
  [selectAuctions],
  (auctions) => auctions.filter(a => a.product.status === 'upcoming')
);

export const selectEndedAuctions = createSelector(
  [selectAuctions],
  (auctions) => auctions.filter(a => a.product.status === 'ended')
);

export const {
  setAuctions,
  addAuction,
  updateAuction,
  addBid,
  toggleWatchAuction,
  setCurrentAuction,
  updateAuctionTime,
} = auction.actions;

export default auction.reducer; 