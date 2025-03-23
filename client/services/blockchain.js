import { ethers } from "ethers";
import address from "@/abis/governmentContractAddress.json";
import abi from "@/artifacts/contracts/Government.sol/GovernmentContract.json";

const contractAddress = address.address;
const contractAbi = abi.abi;
// const contractInterface = new ethers.Interface(contractAbi);

const getEthereum = () => {
    if (typeof window !== "undefined" && window.ethereum) {
        return window.ethereum;
    } else {
        alert("Please install MetaMask!");
        return null;
    }
};

const connectWallet = async () => {
    try {
        const ethereum = getEthereum();
        if (!ethereum) return;

        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0]?.toLowerCase();
    } catch (error) {
        console.error(error);
    }
};

const getEthereumContract = async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const connectedAccount = await connectWallet();
    if (!connectedAccount) {
        console.error("No account connected");
        return null;
    }

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
};

const registerSeller = async ({ sellerWallet, category }) => {
    try {
        const ethereum = getEthereum();
        if (!ethereum) return;

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

        const provider = new ethers.BrowserProvider(ethereum);
        const txRes = await provider.getTransaction(tx.hash);

        console.log("TXRES:", txRes);

        //if we want data from hash, we use the following line
        // const decodedData = contractInterface.parseTransaction({ data: txRes.data });

        return txRes.hash;
    } catch (err) {
        console.error(err);
    }
};

const getSellerByWallet = async ({ sellerWallet }) => {
    try {
        const ethereum = getEthereum();
        if (!ethereum) return;

        if (!sellerWallet) {
            console.error("Seller Wallet is null or undefined!");
            return;
        }

        const contract = await getEthereumContract();
        if (!contract) {
            console.error("Failed to load contract.");
            return;
        }

        const seller = await contract.getSellerByWallet(sellerWallet);
        return seller.map((category) => category);
    } catch (err) {
        console.error(err);
    }
};

export { connectWallet, registerSeller, getSellerByWallet };
