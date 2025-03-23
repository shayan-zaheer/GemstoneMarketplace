const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const GovernmentContract = await hre.ethers.getContractFactory(
        "GovernmentContract"
    );
    const governmentContract = await GovernmentContract.deploy();
    await governmentContract.waitForDeployment();
    const governmentContractAddress = await governmentContract.getAddress();

    console.log("GovernmentContract deployed at:", governmentContractAddress);

    const abisPath = path.join(__dirname, "../abis");
    if (!fs.existsSync(abisPath)) {
        fs.mkdirSync(abisPath, { recursive: true });
    }

    fs.writeFileSync(
        path.join(abisPath, "governmentContractAddress.json"),
        JSON.stringify({ address: governmentContractAddress }, null, 4)
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
