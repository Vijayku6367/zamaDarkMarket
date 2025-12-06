require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("Wallet Address:", wallet.address);
  
  const balance = await wallet.getBalance();
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
  
  if (balance.eq(0)) {
    console.log("\n❌ ERROR: Wallet has 0 ETH!");
    console.log("Get test ETH from: https://sepoliafaucet.com/");
    console.log("Send to:", wallet.address);
  } else {
    console.log("\n✅ Wallet has ETH. Should work!");
  }
}

main().catch(console.error);
