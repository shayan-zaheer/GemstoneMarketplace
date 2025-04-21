const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const governmentContractAddress = require("../abis/governmentContractAddress.json").address

async function main() {
    // const governmentContractAddress = "0xb034a73Fe798421399b057BC603E018A328b607a";

    const GemstoneContract = await hre.ethers.getContractFactory(
        "GemstoneMarketplace"
    );
    const gemstoneContract = await GemstoneContract.deploy(governmentContractAddress);
    await gemstoneContract.waitForDeployment();
    const gemstoneContractAddress = await gemstoneContract.getAddress();

    console.log("GemstoneContract deployed at:", gemstoneContractAddress);

    const abisPath = path.join(__dirname, "../abis");
    if (!fs.existsSync(abisPath)) {
        fs.mkdirSync(abisPath, { recursive: true });
    }

    fs.writeFileSync(
        path.join(abisPath, "gemstoneContractAddress.json"),
        JSON.stringify({ address: gemstoneContractAddress }, null, 4)
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
