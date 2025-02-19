"use client";

import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultConfig,
    createAuthenticationAdapter,
    RainbowKitAuthenticationProvider,
    RainbowKitProvider,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { getAddress } from "ethers";
import { createSiweMessage } from "viem/siwe";
import { WagmiProvider } from "wagmi";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const Web3Provider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState("loading");
    const [jwt, setJwt] = useState("");
    const [providerKey, setProviderKey] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setJwt(token);
            setAuthStatus("authenticated");
        } else {
            setAuthStatus("unauthenticated");
        }
    }, []);

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const address = getAddress(accounts[0]);
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/nonce`,
                    { params: { address } }
                );
                return data.nonce;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        createMessage: ({ nonce, address, chainId }) => {
            return createSiweMessage({
                domain: window.location.host,
                address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId,
                nonce,
            });
        },

        verify: async ({ message, signature }) => {
            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
                    { message, signature }
                );
                localStorage.setItem("jwt", data.token);
                setJwt(data.token);
                setAuthStatus("authenticated");
                setProviderKey((prevKey) => prevKey + 1);
                return true;
            } catch (error) {
                console.error(error);
                setAuthStatus("unauthenticated");
                return false;
            }
        },

        signOut: async () => {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const address = getAddress(accounts[0]);
                await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
                    { address }
                );
                localStorage.removeItem("jwt");
                setJwt("");
                setAuthStatus("unauthenticated");
                setProviderKey((prevKey) => prevKey + 1);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const config = getDefaultConfig({
        appName: "GemVault",
        projectId: "c81d2fae69f04511fae313c7a6bac292",
        chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
        ssr: true,
    });

    return (
        <WagmiProvider config={config} key={providerKey}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitAuthenticationProvider
                    adapter={authenticationAdapter}
                    status={authStatus}
                >
                    <RainbowKitProvider theme={darkTheme()}>
                        {children}
                    </RainbowKitProvider>
                </RainbowKitAuthenticationProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Web3Provider;
