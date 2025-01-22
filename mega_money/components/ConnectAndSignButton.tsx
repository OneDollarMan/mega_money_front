import { useState, useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";
import { useAuth } from "./AuthContext";

export const ConnectAndSignButton = () => {
    const { sdk, connected, connecting, provider, chainId } = useSDK();
    const { walletAddress, login, logout, accessToken } = useAuth();
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch user balance when walletAddress or accessToken changes
    useEffect(() => {
        if (walletAddress && accessToken) {
            fetchUserBalance();
        }
    }, [walletAddress, accessToken]);

    const fetchUserBalance = async () => {
        setIsLoadingBalance(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.statusText}`);
            }

            const userData = await response.json();
            setUserBalance(userData.balance);
        } catch (err) {
            console.error("Error fetching user balance:", err);
            setError("Failed to load balance.");
            logout();
        } finally {
            setIsLoadingBalance(false);
        }
    };

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
            let resp_data = await response.json();

            const accounts = (await provider?.request({ method: "eth_requestAccounts" })) as string[];
            if (accounts) {
                login(resp_data.access_token, accounts[0]);
            } else {
                throw new Error(accounts);
            }
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        console.debug('Disconnecting...');
        sdk?.terminate();
        logout();
        setUserBalance(null); // Reset balance on disconnect
    };

    // Function to shrink the wallet address (e.g., "0x1234...5678")
    const shrinkWalletAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="flex items-center space-x-4">
            {walletAddress ? (
                <>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-lg">
                            {shrinkWalletAddress(walletAddress)}
                        </div>
                        {isLoadingBalance ? (
                            <div className="text-sm text-gray-400">Loading balance...</div>
                        ) : error ? (
                            <div className="text-sm text-red-400">{error}</div>
                        ) : (
                            <div className="text-sm text-green-400 bg-gray-700 px-3 py-1 rounded-lg">
                                Balance: {userBalance + " T" || "N/A"}
                            </div>
                        )}
                    </div>
                    <button
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:from-orange-500 hover:to-red-500 hover:shadow-lg transform transition-all hover:scale-105 active:scale-95"
                        onClick={disconnect}
                    >
                        Disconnect
                    </button>
                </>
            ) : (
                <button
                    onClick={connect}
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:from-teal-500 hover:to-green-400 hover:shadow-lg transform transition-all hover:scale-105 active:scale-95"
                >
                    {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
            )}
        </div>
    );
};