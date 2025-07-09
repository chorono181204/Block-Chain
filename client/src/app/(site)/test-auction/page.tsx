"use client";
import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TestAuction = () => {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Add useEffect to check account on mount
  useEffect(() => {
    const checkAccount = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            console.log('Found existing account:', accounts[0]);
          }
        } catch (error) {
          console.error('Error checking account:', error);
        }
      }
    };
    
    checkAccount();
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        setLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Get account
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        setAccount(account);
        console.log('Connected account:', account);
        
        // Get balance
        const balance = await window.ethereum.request({ 
          method: 'eth_getBalance', 
          params: [account, 'latest'] 
        });
        setBalance((parseInt(balance, 16) / 1e18).toFixed(4));
        
        setMessage('Wallet connected successfully!');
      } catch (error) {
        console.error('Error connecting wallet:', error);
        setMessage('Error connecting wallet');
      }
      setLoading(false);
    } else {
      setMessage('MetaMask not found! Please install MetaMask.');
    }
  };

  const createAuction = async () => {
    setMessage('Creating auction... (This is a test)');
  };

  const placeBid = async () => {
    setMessage('Placing bid... (This is a test)');
  };

  // Debug function
  const debugConnection = async () => {
    console.log('Current account state:', account);
    console.log('Window ethereum:', typeof window !== 'undefined' ? !!window.ethereum : 'window undefined');
    
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log('Available accounts:', accounts);
        setMessage(`Debug: Found ${accounts.length} accounts`);
      } catch (error) {
        console.error('Debug error:', error);
        setMessage('Debug: Error checking accounts');
      }
    } else {
      setMessage('Debug: MetaMask not available');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Auction Test Page</h1>
      
      {/* Debug section */}
      <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
        <p className="text-red-800 mb-2">Debug Info:</p>
        <p className="text-sm">Account state: {account || 'empty'}</p>
        <p className="text-sm">MetaMask available: {typeof window !== 'undefined' && window.ethereum ? 'Yes' : 'No'}</p>
        <p className="text-sm">Should show button: {!account ? 'Yes' : 'No'}</p>
        <button 
          onClick={debugConnection}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Debug Connection
        </button>
      </div>
      
      {/* Always show Connect Wallet button for testing */}
      <div className="mb-4">
        <button 
          onClick={connectWallet}
          disabled={loading}
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          Make sure MetaMask is installed and you're connected to localhost:8545
        </p>
      </div>
      
      {/* Show account info if connected */}
      {account && (
        <div>
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
          
          <div className="mb-6 space-y-4">
            <button 
              onClick={createAuction}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Test Auction
            </button>
            
            <button 
              onClick={placeBid}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
            >
              Place Test Bid
            </button>
          </div>
        </div>
      )}
      
      {message && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-800">{message}</p>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Install MetaMask browser extension</li>
          <li>Add localhost:8545 network in MetaMask</li>
          <li>Import one of the test accounts from Hardhat</li>
          <li>Click "Connect Wallet"</li>
          <li>Test the auction functions</li>
        </ol>
      </div>
    </div>
  );
};

export default TestAuction; 