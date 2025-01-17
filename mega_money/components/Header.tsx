import { MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectAndSignButton } from "./ConnectAndSignButton";

export default function Header() {
    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Next-Metamask-Boilerplate",
            url: "http://localhost:3000",
        },
    };

    return (
        <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-xl font-bold text-green-500">NFT Lootboxes</h1>
                <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                    <ConnectAndSignButton />
                </MetaMaskProvider>
            </div>
        </header>
    );
}