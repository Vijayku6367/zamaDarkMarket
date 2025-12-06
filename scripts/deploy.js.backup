const hre = require("hardhat");

async function main() {
  const Market = await hre.ethers.getContractFactory("MockDarkMarket");
  const market = await Market.deploy();
  await market.waitForDeployment();
  console.log("MockDarkMarket deployed at:", await market.getAddress());

  const Math = await hre.ethers.getContractFactory("MockEncryptedMath");
  const math = await Math.deploy();
  await math.waitForDeployment();
  console.log("MockEncryptedMath deployed at:", await math.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
