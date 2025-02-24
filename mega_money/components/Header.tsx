"use client"
import { ConnectAndSignButton } from "./ConnectAndSignButton";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function Header() {
    return (
        <header className="bg-gray-800/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                    NFT Lootboxes
                </h1>
                <TonConnectUIProvider manifestUrl="http://191.96.11.165/static/frontend/tonconnect-manifest.json">
                    <ConnectAndSignButton />
                </TonConnectUIProvider>
            </div>
        </header>
    );
}