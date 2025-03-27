const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const strategyNFT = await hre.ethers.getContractAt("StrategyNFT", "0x9bC5eCB79756eaD27Ec14C6A8DAC358D1b042F28");

  const tx = await strategyNFT.mintStrategy(
    deployer.address, 
    "TSLA", 
    "Buy when TSLA breaks above 50-day high with high volume.", 
    "Sell if price falls 3% below breakout level or RSI above 75.", 
    "Trailing stop loss at 5% below breakout.", 
    "Backtested Win Rate: 68%, Average Return per Trade: 12%", 
    "ipfs://bafkreifeyb27cvoeeexzxsq7se4cce6k7bwbilrjvm3ere5qnjz4sak5xa"
  );

  console.log("Minting transaction hash:", tx.hash);
  await tx.wait();
  console.log("NFT Minted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
