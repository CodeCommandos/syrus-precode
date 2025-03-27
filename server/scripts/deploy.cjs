const hre = require("hardhat");

async function main() {
    const StrategyNFT = await hre.ethers.getContractFactory("StrategyNFT");
    const strategyNFT = await StrategyNFT.deploy(); // Deploy contract

    await strategyNFT.waitForDeployment(); // ✅ Correct function

    console.log("StrategyNFT deployed to:", await strategyNFT.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
