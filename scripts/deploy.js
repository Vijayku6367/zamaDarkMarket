async function main() {
  console.log("Starting DarkMarket deployment...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
  
  const DarkMarket = await ethers.getContractFactory("DarkMarket");
  const darkMarket = await DarkMarket.deploy();
  
  await darkMarket.deployed();
  
  console.log("DarkMarket deployed to:", darkMarket.address);
  console.log("Transaction:", darkMarket.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
