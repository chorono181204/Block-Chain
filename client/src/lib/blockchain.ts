import { ethers } from 'ethers';
import AuctionContractABI from '../contracts/AuctionContract.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID!;

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;

  async connect() {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        this.contract = new ethers.Contract(CONTRACT_ADDRESS, AuctionContractABI.abi, this.signer);
        
        return true;
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
        return false;
      }
    }
    return false;
  }

  async createAuction(
    title: string,
    description: string,
    startingPrice: number,
    reservePrice: number,
    duration: number,
    imageUri: string
  ) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const startingPriceWei = ethers.parseEther(startingPrice.toString());
    const reservePriceWei = ethers.parseEther(reservePrice.toString());
    const durationSeconds = duration * 24 * 60 * 60; // Convert days to seconds
    
    const tx = await this.contract.createAuction(
      title,
      description,
      startingPriceWei,
      reservePriceWei,
      durationSeconds,
      imageUri
    );
    
    const receipt = await tx.wait();
    return receipt;
  }

  async placeBid(auctionId: number, bidAmount: number) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const bidAmountWei = ethers.parseEther(bidAmount.toString());
    
    const tx = await this.contract.placeBid(auctionId, { value: bidAmountWei });
    const receipt = await tx.wait();
    return receipt;
  }

  async getAuction(auctionId: number) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const auction = await this.contract.getAuction(auctionId);
    return {
      id: auction.id.toString(),
      seller: auction.seller,
      title: auction.title,
      description: auction.description,
      startingPrice: ethers.formatEther(auction.startingPrice),
      currentBid: ethers.formatEther(auction.currentBid),
      reservePrice: ethers.formatEther(auction.reservePrice),
      startTime: new Date(auction.startTime * 1000),
      endTime: new Date(auction.endTime * 1000),
      status: auction.status,
      highestBidder: auction.highestBidder,
      totalBids: auction.totalBids.toString(),
      imageUri: auction.imageUri
    };
  }

  async getAuctionBids(auctionId: number) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const bids = await this.contract.getAuctionBids(auctionId);
    return bids.map((bid: any) => ({
      bidder: bid.bidder,
      amount: ethers.formatEther(bid.amount),
      timestamp: new Date(bid.timestamp * 1000)
    }));
  }

  async getUserAuctions(address: string) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const auctionIds = await this.contract.getUserAuctions(address);
    return auctionIds.map((id: any) => id.toString());
  }

  async getUserBids(address: string) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const auctionIds = await this.contract.getUserBids(address);
    return auctionIds.map((id: any) => id.toString());
  }

  async endAuction(auctionId: number) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const tx = await this.contract.endAuction(auctionId);
    const receipt = await tx.wait();
    return receipt;
  }

  async cancelAuction(auctionId: number) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const tx = await this.contract.cancelAuction(auctionId);
    const receipt = await tx.wait();
    return receipt;
  }

  async getTotalAuctions() {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const total = await this.contract.getTotalAuctions();
    return total.toString();
  }

  async getAccount() {
    if (!this.signer) throw new Error('Signer not initialized');
    
    return await this.signer.getAddress();
  }

  async getBalance() {
    if (!this.signer) throw new Error('Signer not initialized');
    
    const address = await this.signer.getAddress();
    const balance = await this.provider!.getBalance(address);
    return ethers.formatEther(balance);
  }
}

export const blockchainService = new BlockchainService(); 