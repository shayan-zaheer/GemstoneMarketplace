import { ethers } from "ethers";
import address from "@/contracts/abis/contractAddress.json";
import abi from "@/contracts/artifacts/contracts/Government.sol/GovernmentContract.json";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

const connectWallet = async () => {
  try { 
    if (!ethereum) {
      console.log("Make sure you have metamask installed!");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("account address", accounts[0]?.toLowerCase());
    return accounts[0]?.toLowerCase();
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  const connectedAccount = await connectWallet();
  if (connectedAccount) {
    const provider = new ethers.BrowserProvider(ethereum);
    console.log("Provider", provider);
    const signer = await provider.getSigner();
    // ABI is like the API documentation that tells how to interact with it.
    console.log("signner", signer);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    console.log("No Account connected");
  }
};

const registerSeller = async ({ sellerWallet, category }) => {
  try {
      if (!ethereum) return alert("Please install Metamask");

      if (!sellerWallet) {
          console.error("Seller Wallet is null or undefined!");
          return;
      }

      const contract = await getEthereumContract();
      if (!contract) {
          console.error("Failed to load contract.");
          return;
      }

      const tx = await contract.registerSeller(sellerWallet, category);
      await tx.wait();
      console.log("Seller successfully registered!");
  } catch (err) {
      console.error(err);
  }
};

const getAllSellers = async() => {
    try{
        if(!ethereum) return alert("Please install Metamask");

        const contract = await getEthereumContract();
        console.log("Contract Address:", contract);
        const sellers = await contract.getAllSellers();
        console.log(sellers);
          return sellers;
    } catch(err){
        reportError(err);
    }
}

export { connectWallet, registerSeller, getAllSellers };