// scripts/test-network.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Testing network connection...");
  
  try {
    // Get provider
    const provider = ethers.provider;
    
    // Try to get network
    const network = await provider.getNetwork();
    console.log("Network detected:", network);
    
    // Try to get block number
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block:", blockNumber);
    
    // Try to get gas price
    const gasPrice = await provider.getGasPrice();
    console.log("Gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");
    
    // Check account balance
    const [signer] = await ethers.getSigners();
    console.log("Signer address:", signer.address);
    
    const balance = await signer.getBalance();
    console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
    
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Full error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
