require("dotenv").config(); // Load .env at the top
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/jnKvepkMCqoQIszeQhA-x-C40NdPgdUS`,
            accounts: [`f014759d9809b3302a10deeed6cb2576d610b0d922037076e266e8dc5f1994ea`],
        },
    },
};
