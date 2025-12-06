async function main() {
  console.log("Starting deployment test...");
  
  // Get signer
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
  
  if (balance.eq(0)) {
    throw new Error("Insufficient balance. Get Sepolia ETH from faucet.");
  }
  
  // Deploy simple contract
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying SimpleStorage...");
  
  const gasPrice = await deployer.getGasPrice();
  console.log("Current gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");
  
  const simpleStorage = await SimpleStorage.deploy();
  console.log("Transaction sent, waiting for confirmation...");
  
  await simpleStorage.deployed();
  console.log("✅ SimpleStorage deployed to:", simpleStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
