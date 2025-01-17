import { useState } from "react";
import { useSDK } from "@metamask/sdk-react"
import { useAuth } from "./AuthContext";

export const ConnectAndSignButton = () => {
    const { sdk, connected, connecting, provider, chainId } = useSDK();
    const { walletAddress, login, logout } = useAuth();

    const connect = async () => {
        if (walletAddress) {
            return;
        }

        try {
            const signature = await sdk?.connectAndSign({
                msg: "Authenticate on NFT lootboxes",
            });

            const response = await fetch('http://localhost:8000/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ signature }),
            });
            let resp_data = await response.json()

            const accounts = await provider?.request({ method: "eth_requestAccounts" }) as string[];
            if (accounts) {
                login(resp_data.access_token, accounts[0])
            } else {
                throw new Error(accounts)
            }

        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        console.debug('Disconnecting...')
        sdk?.terminate();
        logout();
    };

    return (
        <div>
            {walletAddress ? (
                <>
                    <span className="text-sm text-gray-300">{walletAddress}</span>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={disconnect}
                    >
                        Disconnect
                    </button>
                </>
            ) : (
                <button
                    onClick={connect}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Connect Metamask
                </button>
            )}
        </div>
    );
}