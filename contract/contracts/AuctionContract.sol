// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionContract is Ownable {
    uint256 private _auctionIds = 0;
    
    struct Auction {
        uint256 id;
        address payable seller;
        string title;
        string description;
        uint256 startingPrice;
        uint256 currentBid;
        address payable highestBidder;
        uint256 endTime;
        bool ended;
        bool cancelled;
        uint256 minBidIncrement;
        uint256 totalBids;
    }
    
    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }
    
    enum AuctionStatus { Active, Ended, Cancelled }
    
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Bid[]) public auctionBids;
    mapping(address => uint256[]) public userAuctions;
    mapping(address => uint256[]) public userBids;
    mapping(address => uint256[]) public watchedAuctions;
    
    event AuctionCreated(uint256 indexed auctionId, address indexed seller, string title, uint256 startingPrice, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address indexed winner, uint256 amount);
    event AuctionCancelled(uint256 indexed auctionId, address indexed seller);
    event BidRefunded(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    
    modifier auctionExists(uint256 _auctionId) {
        require(_auctionId > 0 && _auctionId <= _auctionIds, "Auction does not exist");
        _;
    }
    
    modifier auctionActive(uint256 _auctionId) {
        require(!auctions[_auctionId].ended, "Auction has ended");
        require(!auctions[_auctionId].cancelled, "Auction has been cancelled");
        require(block.timestamp < auctions[_auctionId].endTime, "Auction has expired");
        _;
    }
    
    modifier onlyAuctionSeller(uint256 _auctionId) {
        require(msg.sender == auctions[_auctionId].seller, "Only seller can perform this action");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        _auctionIds = 0; 
    }
    
    function createAuction(
        string memory _title,
        string memory _description,
        uint256 _startingPrice,
        uint256 _duration,
        uint256 _minBidIncrement
    ) external returns (uint256) {
        require(_startingPrice > 0, "Starting price must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(_minBidIncrement > 0, "Minimum bid increment must be greater than 0");
        
        _auctionIds++;
        uint256 auctionId = _auctionIds;
        
        auctions[auctionId] = Auction({
            id: auctionId,
            seller: payable(msg.sender),
            title: _title,
            description: _description,
            startingPrice: _startingPrice,
            currentBid: 0,
            highestBidder: payable(address(0)),
            endTime: block.timestamp + _duration,
            ended: false,
            cancelled: false,
            minBidIncrement: _minBidIncrement,
            totalBids: 0
        });
        
        userAuctions[msg.sender].push(auctionId);
        
        emit AuctionCreated(auctionId, msg.sender, _title, _startingPrice, block.timestamp + _duration);
        return auctionId;
    }
    
    function placeBid(uint256 _auctionId) external payable auctionExists(_auctionId) auctionActive(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        require(msg.sender != auction.seller, "Seller cannot bid on their own auction");
        require(msg.value >= auction.startingPrice, "Bid must be at least starting price");
        
        uint256 minBid = auction.currentBid == 0 ? auction.startingPrice : auction.currentBid + auction.minBidIncrement;
        require(msg.value >= minBid, "Bid must be higher than current bid plus minimum increment");
        
       
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.currentBid);
            emit BidRefunded(_auctionId, auction.highestBidder, auction.currentBid);
        }
        
      
        auction.currentBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        auction.totalBids++;
        
      
        auctionBids[_auctionId].push(Bid({
            bidder: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));
        
        userBids[msg.sender].push(_auctionId);
        
        emit BidPlaced(_auctionId, msg.sender, msg.value);
    }
    
    function endAuction(uint256 _auctionId) external auctionExists(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        require(!auction.ended, "Auction already ended");
        require(block.timestamp >= auction.endTime, "Auction not yet ended");
        require(msg.sender == auction.seller || msg.sender == owner(), "Only seller or owner can end auction");
        
        auction.ended = true;
        
        if (auction.highestBidder != address(0)) {
            
            auction.seller.transfer(auction.currentBid);
            emit AuctionEnded(_auctionId, auction.highestBidder, auction.currentBid);
        }
    }
    
    function cancelAuction(uint256 _auctionId) external auctionExists(_auctionId) onlyAuctionSeller(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        require(!auction.ended, "Auction already ended");
        require(!auction.cancelled, "Auction already cancelled");
        require(auction.totalBids == 0, "Cannot cancel auction with bids");
        
        auction.cancelled = true;
        emit AuctionCancelled(_auctionId, msg.sender);
    }
    
    function withdrawBid(uint256 _auctionId) external auctionExists(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        require(auction.ended || auction.cancelled, "Auction is still active");
        require(msg.sender != auction.highestBidder, "Winner cannot withdraw");
        
        uint256 refundAmount = 0;
        for (uint256 i = 0; i < auctionBids[_auctionId].length; i++) {
            if (auctionBids[_auctionId][i].bidder == msg.sender) {
                refundAmount += auctionBids[_auctionId][i].amount;
            }
        }
        
        require(refundAmount > 0, "No bids to withdraw");
        
       
        for (uint256 i = 0; i < auctionBids[_auctionId].length; i++) {
            if (auctionBids[_auctionId][i].bidder == msg.sender) {
                auctionBids[_auctionId][i].amount = 0;
            }
        }
        
        payable(msg.sender).transfer(refundAmount);
        emit BidRefunded(_auctionId, msg.sender, refundAmount);
    }
    
    function extendAuction(uint256 _auctionId, uint256 _additionalTime) external onlyAuctionSeller(_auctionId) auctionActive(_auctionId) {
        require(_additionalTime > 0, "Additional time must be greater than 0");
        auctions[_auctionId].endTime += _additionalTime;
    }
    
    function toggleWatchAuction(uint256 _auctionId) external auctionExists(_auctionId) {
        uint256[] storage watched = watchedAuctions[msg.sender];
        
       
        bool isWatching = false;
        uint256 watchingIndex = 0;
        for (uint256 i = 0; i < watched.length; i++) {
            if (watched[i] == _auctionId) {
                isWatching = true;
                watchingIndex = i;
                break;
            }
        }
        
        if (isWatching) {
           
            watched[watchingIndex] = watched[watched.length - 1];
            watched.pop();
        } else {
            
            watched.push(_auctionId);
        }
    }
    
    
    function getAuction(uint256 _auctionId) external view auctionExists(_auctionId) returns (
        uint256 id,
        address seller,
        string memory title,
        string memory description,
        uint256 startingPrice,
        uint256 currentBid,
        address highestBidder,
        uint256 endTime,
        bool ended,
        bool cancelled,
        uint256 minBidIncrement,
        uint256 totalBids
    ) {
        Auction memory auction = auctions[_auctionId];
        return (
            auction.id,
            auction.seller,
            auction.title,
            auction.description,
            auction.startingPrice,
            auction.currentBid,
            auction.highestBidder,
            auction.endTime,
            auction.ended,
            auction.cancelled,
            auction.minBidIncrement,
            auction.totalBids
        );
    }
    
    function getAuctionBids(uint256 _auctionId) external view auctionExists(_auctionId) returns (Bid[] memory) {
        return auctionBids[_auctionId];
    }
    
    function getUserAuctions(address _user) external view returns (uint256[] memory) {
        return userAuctions[_user];
    }
    
    function getUserBids(address _user) external view returns (uint256[] memory) {
        return userBids[_user];
    }
    
    function getWatchedAuctions(address _user) external view returns (uint256[] memory) {
        return watchedAuctions[_user];
    }
    
    function getAuctionStatus(uint256 _auctionId) external view auctionExists(_auctionId) returns (AuctionStatus) {
        Auction memory auction = auctions[_auctionId];
        if (auction.cancelled) return AuctionStatus.Cancelled;
        if (auction.ended || block.timestamp >= auction.endTime) return AuctionStatus.Ended;
        return AuctionStatus.Active;
    }
    
    function getTotalAuctions() external view returns (uint256) {
        return _auctionIds;
    }
    
    function getActiveAuctions() external view returns (uint256[] memory) {
        uint256[] memory activeAuctions = new uint256[](_auctionIds);
        uint256 activeCount = 0;
        
        for (uint256 i = 1; i <= _auctionIds; i++) {
            Auction memory auction = auctions[i];
            if (!auction.ended && !auction.cancelled && block.timestamp < auction.endTime) {
                activeAuctions[activeCount] = i;
                activeCount++;
            }
        }
        
       
        uint256[] memory result = new uint256[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            result[i] = activeAuctions[i];
        }
        
        return result;
    }
    
 
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function pauseContract() external onlyOwner {
    }
} 