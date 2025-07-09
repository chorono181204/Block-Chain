"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TestAuction = () => {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Contract ABI (simplified)
  const contractABI = [
    "function createAuction(string memory _title, uint256 _startingPrice, uint256 _duration) external returns (uint256)",
    "function placeBid(uint256 _auctionId) external payable",
    "function endAuction(uint256 _auctionId) external",
    "function getAuction(uint256 _auctionId) external view returns (uint256 id, address seller, string memory title, uint256 startingPrice, uint256 currentBid, address highestBidder, uint256 endTime, bool ended)",
    "function auctionId() external view returns (uint256)"
  ];

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        setAccount(address);
        setBalance(ethers.formatEther(balance));
        
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
        
        loadAuctions(contractInstance);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const loadAuctions = async (contractInstance: any) => {
    try {
      const totalAuctions = await contractInstance.auctionId();
      const auctionList = [];
      
      for (let i = 1; i <= totalAuctions; i++) {
        const auction = await contractInstance.getAuction(i);
        auctionList.push({
          id: i,
          seller: auction.seller,
          title: auction.title,
          startingPrice: ethers.formatEther(auction.startingPrice),
          currentBid: ethers.formatEther(auction.currentBid),
          highestBidder: auction.highestBidder,
          endTime: new Date(Number(auction.endTime) * 1000),
          ended: auction.ended
        });
      }
      
      setAuctions(auctionList);
    } catch (error) {
      console.error('Error loading auctions:', error);
    }
  };

  const createAuction = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const title = "Test Auction " + Date.now();
      const startingPrice = ethers.parseEther("0.1");
      const duration = 3600; // 1 hour
      
      const tx = await contract.createAuction(title, startingPrice, duration);
      await tx.wait();
      
      alert('Auction created successfully!');
      loadAuctions(contract);
    } catch (error) {
      console.error('Error creating auction:', error);
      alert('Error creating auction');
    }
    setLoading(false);
  };

  const placeBid = async (auctionId: number, bidAmount: string) => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const amount = ethers.parseEther(bidAmount);
      const tx = await contract.placeBid(auctionId, { value: amount });
      await tx.wait();
      
      alert('Bid placed successfully!');
      loadAuctions(contract);
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid');
    }
    setLoading(false);
  };

  const endAuction = async (auctionId: number) => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const tx = await contract.endAuction(auctionId);
      await tx.wait();
      
      alert('Auction ended successfully!');
      loadAuctions(contract);
    } catch (error) {
      console.error('Error ending auction:', error);
      alert('Error ending auction');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Auction Test Page</h1>
      
      {!account ? (
        <button 
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
          
          <div className="mb-6">
            <button 
              onClick={createAuction}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Test Auction'}
            </button>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Auctions</h2>
            {auctions.map((auction) => (
              <div key={auction.id} className="border p-4 mb-4 rounded">
                <h3 className="text-xl font-semibold">{auction.title}</h3>
                <p><strong>Seller:</strong> {auction.seller}</p>
                <p><strong>Starting Price:</strong> {auction.startingPrice} ETH</p>
                <p><strong>Current Bid:</strong> {auction.currentBid} ETH</p>
                <p><strong>Highest Bidder:</strong> {auction.highestBidder}</p>
                <p><strong>End Time:</strong> {auction.endTime.toLocaleString()}</p>
                <p><strong>Status:</strong> {auction.ended ? 'Ended' : 'Active'}</p>
                
                {!auction.ended && (
                  <div className="mt-4">
                    <input 
                      type="number" 
                      placeholder="Bid amount (ETH)"
                      className="border p-2 mr-2"
                      id={`bid-${auction.id}`}
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById(`bid-${auction.id}`) as HTMLInputElement;
                        placeBid(auction.id, input.value);
                      }}
                      disabled={loading}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      Place Bid
                    </button>
                    <button 
                      onClick={() => endAuction(auction.id)}
                      disabled={loading}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 ml-2"
                    >
                      End Auction
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAuction; 