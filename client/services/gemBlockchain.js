import { ethers } from "ethers";
import address from "@/abis/gemstoneContractAddress.json";
import abi from "@/artifacts/contracts/Gems.sol/GemstoneMarketplace.json";
import { abi as GovAbi } from "@/artifacts/contracts/Government.sol/GovernmentContract.json";
import { getEthereumContract, getEthereum } from "./blockchain";
const contractAddress = address.address;
const contractAbi = abi.abi;
const contractInterface = new ethers.Interface(GovAbi);

const verifySeller = async (txHash, walletAddress) => {
  const ethereum = getEthereum();
  if (!ethereum) return;

  const contract = await getEthereumContract(contractAddress, contractAbi);

  if (!contract) {
    console.error("Failed to load contract.");
    return;
  }

  const provider = new ethers.BrowserProvider(ethereum);

  const txRes = await provider.getTransaction(txHash);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  //if we want data from hash, we use the following line
  const decodedData = contractInterface.parseTransaction({ data: txRes.data });
  console.log("TXRES:", decodedData.args[0], address);

  return decodedData.args[0].trim() == address.trim();
};

const uploadGemOnChain = async (gemId, category) => {
    console.log(gemId,category)
  const ethereum = getEthereum();
  if (!ethereum) return;

  const contract = await getEthereumContract(contractAddress, contractAbi);

  if (!contract) {
    console.error("Failed to load contract.");
    return;
  }

  const tx = await contract.uploadGem(gemId, category);
  await tx.wait();
  return tx;
};

const sellGems = async (gemId, buyerAddress) => {
  const ethereum = getEthereum();
  if (!ethereum) return;

  const contract = await getEthereumContract(contractAddress, contractAbi);

  if (!contract) {
    console.error("Failed to load contract.");
    return;
  }

  const tx = await contract.uploadGem(gemId, category);
  await tx.wait();
};

export { verifySeller, uploadGemOnChain, sellGems };
