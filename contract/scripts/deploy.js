const hre = require("hardhat");

async function main() {
  console.log("Deploying AuctionContract...");

  const AuctionContract = await hre.ethers.getContractFactory("AuctionContract");
  const auctionContract = await AuctionContract.deploy();

  await auctionContract.waitForDeployment();

  const address = await auctionContract.getAddress();
  console.log("AuctionContract deployed to:", address);

  console.log("Contract address for frontend:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 