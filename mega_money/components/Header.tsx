import { MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectAndSignButton } from "./ConnectAndSignButton";

export default function Header() {
    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "NFT Lootboxes",
            url: "http://localhost:3000",
        },
    };

    return (
        <header className="bg-gray-800/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                    NFT Lootboxes
                </h1>
                <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                    <ConnectAndSignButton />
                </MetaMaskProvider>
            </div>
        </header>
    );
}