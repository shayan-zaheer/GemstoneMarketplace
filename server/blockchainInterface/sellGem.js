const { ethers } = require("ethers");

let contractAddress = require("../../client/abis/gemstoneContractAddress.json")
let contractABI = require("../../client/artifacts/contracts/Gems.sol/GemstoneMarketplace.json");


async function sellGem (gemId,newOwner){

    
    console.log(newOwner)
    const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`); // e.g., Infura, Alchemy, QuickNode

    // Use .env for security
 
const privateKey = process.env.WALLET_SERVER_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);


const contract = new ethers.Contract(
    contractAddress.address,
    contractABI.abi,
    wallet // connected signer
  );
  

  const res = await contract.sellGem(gemId,newOwner)
  await res.wait()
  console.log("Blockchain Ownership Transfer Recceipt:",res)
  return res;
}


async function getHistory (gemId){
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`); // e.g., Infura, Alchemy, QuickNode

  // Use .env for security
  console.log(process.env.WALLET_SERVER_PRIVATE_KEY)
const privateKey = process.env.WALLET_SERVER_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);


const contract = new ethers.Contract(
  contractAddress.address,
  contractABI.abi,
  wallet // connected signer
);


const res = await contract.getOwnershipHistory(gemId)


return res;
}


module.exports = {sellGem, getHistory}