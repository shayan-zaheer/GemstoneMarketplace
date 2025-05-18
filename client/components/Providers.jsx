"use client";

import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { useAccount, WagmiProvider } from "wagmi";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: "GemVault",
    projectId: "c81d2fae69f04511fae313c7a6bac292",
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
    ssr: true,
});

const Web3Provider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider >
                    <WalletHandler />
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

const WalletHandler = () => {
    const { address } = useAccount();
    const [providerKey, setProviderKey] = useState(0);

    useEffect(() => {
        if (address) {
            console.log("Connected wallet:", address);
            sendWalletAddressToBackend(address);
        }
    }, [address]);

    const sendWalletAddressToBackend = async (walletAddress) => {
        try {
            console.log(walletAddress);
            setProviderKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error("Failed to send wallet address:", error);
        }
    };

    return null;
};

export default Web3Provider;
