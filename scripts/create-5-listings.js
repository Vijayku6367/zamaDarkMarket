async function main() {
  console.log("Creating 5 test listings...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Creating with account:", deployer.address);
  
  const DarkMarket = await ethers.getContractFactory("DarkMarket");
  const contract = DarkMarket.attach("0xd90a4e5397AFfA943df3c93a9e8Ff06270c4De25");
  
  // 5 different encrypted prices (simulated)
  const listings = [
    "0x8b4e186c6f25591e3a7d2c8f25591e3a7d2c8f25591e3a7d2c8f25591e3a7d2c", // 1 ETH
    "0x3a7d186c8f25591e8b4e2c8f25591e3a7d2c8f25591e3a7d2c8f25591e3a7d2c", // 0.5 ETH
    "0xf2c5186c8f25591e3a7d2c8f25591e8b4e2c8f25591e3a7d2c8f25591e3a7d2c", // 2.5 ETH
    "0x1b3f586c8f25591e3a7d2c8f25591e3a7d2c8f25591e8b4e2c8f25591e3a7d2c", // 0.8 ETH
    "0x8e5d186c8f25591e3a7d2c8f25591e3a7d2c8f25591e3a7d2c8f25591ef2c518"  // 1.5 ETH
  ];
  
  for (let i = 0; i < 5; i++) {
    console.log(`Creating listing ${i+1}...`);
    const tx = await contract.createListing(listings[i]);
    await tx.wait();
    console.log(`✅ Listing ${i+1} created: ${tx.hash}`);
    
    // Wait between transactions
    if (i < 4) {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log("🎉 5 listings created successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
