const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const GovernmentContract = await hre.ethers.getContractFactory("GemstoneContract");
  const governmentContract = await GovernmentContract.deploy();
  await governmentContract.waitForDeployment();
  const contractAddress = await governmentContract.getAddress();
  
  console.log("Contract Address for gemstone:", contractAddress);

  // Ensure the 'abis' directory exists before writing the file
  const abisPath = path.join(__dirname, "../abis");
  if (!fs.existsSync(abisPath)) {
    fs.mkdirSync(abisPath, { recursive: true });
  }

  const addressJson = JSON.stringify({ address: contractAddress }, null, 4);
  fs.writeFileSync(path.join(abisPath, "gemStoneContractAddress.json"), addressJson);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
