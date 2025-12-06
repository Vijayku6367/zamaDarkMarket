async function main() {
  console.log("🚀 Deployment Starting...");
  
  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log("💰 Balance:", ethers.utils.formatEther(balance), "ETH");
  
  if (balance.eq(0)) {
    console.log("❌ ERROR: Add ETH to wallet");
    console.log("Get test ETH from: https://sepoliafaucet.com/");
    console.log("Address:", deployer.address);
    return;
  }
  
  // Check if contract exists
  const contractName = "DarkMarket";
  try {
    const Contract = await ethers.getContractFactory(contractName);
    console.log(`📦 Deploying ${contractName}...`);
    
    // Estimate gas
    const estimatedGas = await ethers.provider.estimateGas(
      Contract.getDeployTransaction()
    );
    console.log("⛽ Estimated gas:", estimatedGas.toString());
    
    // Deploy
    const contract = await Contract.deploy();
    console.log("⏳ Waiting for deployment...");
    
    await contract.deployed();
    
    console.log("✅ SUCCESS!");
    console.log("📝 Contract:", contract.address);
    console.log("🔗 Transaction:", contract.deployTransaction.hash);
    
  } catch (error) {
    console.log("❌ Contract not found, trying SimpleStorage...");
    
    // Try SimpleStorage
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simple = await SimpleStorage.deploy();
    await simple.deployed();
    
    console.log("✅ SimpleStorage deployed:", simple.address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("💥 ERROR:", error.message);
    if (error.code === 'INSUFFICIENT_FUNDS') {
      console.log("💸 Add more ETH to wallet");
    }
    process.exit(1);
  });
