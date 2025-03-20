require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY,
        },
    },
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.METAMASK_SEPOLIA_PRIVATE_KEY],
        },
    },
};
