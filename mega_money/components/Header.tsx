"use client"
import { useAuth } from "./AuthContext";
import { ConnectAndSignButton } from "./ConnectAndSignButton";

export default function Header() {
    const { accessToken, userBalance } = useAuth();

    return (
        <header className="bg-gray-800/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <a href='/'>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                        NFT Lootboxes
                    </h1>
                </a>
                <div className="flex items-center space-x-4">
                    {accessToken && (
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-green-400 bg-gray-700 px-3 py-1 rounded-lg">
                                Balance: {userBalance + " T"}
                            </div>
                        </div>
                    )}

                    <ConnectAndSignButton />
                </div>

            </div>
        </header>
    );
}