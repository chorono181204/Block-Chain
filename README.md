# 🏷️ NextMerce - Blockchain Auction Platform

A decentralized auction platform built with Next.js, Solidity smart contracts, and MetaMask integration.

## 🚀 Features

### ✅ Completed Features
- **User Authentication**: Supabase integration for user management
- **Wallet Integration**: MetaMask connection for blockchain interactions
- **Auction Management**: Create, bid, and manage auctions with ETH
- **Real-time Updates**: Live auction status and bid tracking
- **Responsive UI**: Modern, mobile-friendly interface
- **Smart Contract**: Full-featured auction contract with security features
- **Local Development**: Hardhat local network for testing

### 🔄 In Progress
- **Advanced Bidding**: Proxy bidding and auto-extend features
- **Frontend Integration**: Complete blockchain integration with frontend
- **Production Deployment**: Deploy to testnet/mainnet
- **Mobile App**: React Native mobile application

### 📋 Planned Features
- **NFT Support**: ERC-721 token auctions
- **Multi-chain**: Support for multiple blockchain networks
- **DAO Governance**: Community governance features

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Ethers.js** - Ethereum blockchain interaction

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **Hardhat** - Ethereum development environment
- **Solidity 0.8.20** - Smart contract language
- **OpenZeppelin** - Secure smart contract libraries

### Blockchain
- **Ethereum** - Primary blockchain network
- **MetaMask** - Wallet integration
- **Local Development** - Hardhat local network for testing
- **ETH Bidding** - Native ETH token for auction bidding

## 📁 Project Structure

```
Block-chain/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/           # Utility functions
│   │   ├── redux/         # Redux store
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── contract/              # Smart contracts
│   ├── contracts/         # Solidity contracts
│   ├── scripts/           # Deployment scripts
│   └── hardhat.config.ts  # Hardhat configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MetaMask browser extension
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd Block-chain
```

### 2. Frontend Setup
```bash
cd client
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_NETWORK_ID=1337
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
```

### 3. Smart Contract Setup
```bash
cd contract
npm install
```

Create `.env` file:
```env
SEPOLIA_URL=your_sepolia_rpc_url
POLYGON_URL=your_polygon_rpc_url
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
REPORT_GAS=true
```

### 4. Deploy Smart Contract
```bash
# Start local blockchain
npx hardhat node

# In new terminal, deploy contract
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Start Development
```bash
# Terminal 1: Start frontend
cd client
npm run dev

# Terminal 2: Start blockchain (if not running)
cd contract
npx hardhat node
```

## 🔧 Configuration

### Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get URL and anon key

2. **Database Schema**
```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  wallet_address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Auctions table
CREATE TABLE auctions (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER NOT NULL,
  seller_id UUID REFERENCES user_profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  starting_price DECIMAL(18,8) NOT NULL,
  current_bid DECIMAL(18,8) DEFAULT 0,
  end_time TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'active',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bids table
CREATE TABLE bids (
  id SERIAL PRIMARY KEY,
  auction_id INTEGER REFERENCES auctions(id),
  bidder_id UUID REFERENCES user_profiles(id),
  amount DECIMAL(18,8) NOT NULL,
  transaction_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Watched auctions table
CREATE TABLE watched_auctions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  auction_id INTEGER REFERENCES auctions(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, auction_id)
);
```

3. **Row Level Security (RLS)**
```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE watched_auctions ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auctions policies
CREATE POLICY "Anyone can view auctions" ON auctions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create auctions" ON auctions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Bids policies
CREATE POLICY "Anyone can view bids" ON bids
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create bids" ON bids
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Watched auctions policies
CREATE POLICY "Users can view own watched auctions" ON watched_auctions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own watched auctions" ON watched_auctions
  FOR ALL USING (auth.uid() = user_id);
```

### MetaMask Configuration

1. **Install MetaMask**
   - Download from [metamask.io](https://metamask.io)
   - Create or import wallet

2. **Add Local Network**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

3. **Import Test Accounts**
   - Use private keys from Hardhat output
   - Each account has 10,000 ETH for testing

## 🎯 Usage Guide

### For Users

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve MetaMask connection
   - Verify network is set to Hardhat Local

2. **Browse Auctions**
   - View all active auctions on homepage
   - Filter by category or status
   - Search for specific items

3. **Place Bids (ETH)**
   - Click on auction item
   - Enter bid amount in ETH (must be higher than current bid)
   - Confirm transaction in MetaMask
   - Wait for confirmation

4. **Manage Account**
   - View your auctions and bids
   - Watch auctions for updates
   - Update profile information

### For Developers

1. **Smart Contract Development**
```bash
cd contract
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network localhost
```

2. **Frontend Development**
```bash
cd client
npm run dev
npm run build
npm run lint
```

3. **Testing**
```bash
# Contract tests
cd contract && npm test

# Frontend tests
cd client && npm test
```
