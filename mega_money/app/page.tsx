"use client"
import { useState } from "react";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react"

export const ConnectAndSignButton = () => {
  const [walletAddress, setWalletAddress] = useState<string|null>(null);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const signature = await sdk?.connectAndSign({
        msg: "Connect + Sign message",
      });

      const response = await fetch('http://localhost:8000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature }),
      });
      console.log(await response.json())
      
      const accounts = await provider?.request({method: "eth_requestAccounts"}) as string[];
      setWalletAddress(accounts?accounts[0]:null)
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div>
      {walletAddress ? (
        <>
          <span className="text-sm text-gray-300">{walletAddress}</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={disconnect}
          >Disconnect</button>
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


export default function Home() {
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: "http://localhost:3000",
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-green-500">NFT Lootboxes</h1>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <ConnectAndSignButton />
          </MetaMaskProvider>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">Open Your Lootbox</h2>
          <p className="text-gray-300 mb-8">
            Explore, discover, and collect unique NFTs by opening lootboxes.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded">
            Start Now
          </button>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-green-500 mb-4">Why Choose Our Lootboxes?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold text-white">Exclusive NFTs</h4>
              <p className="text-gray-400 mt-2">Every lootbox contains NFTs you won’t find elsewhere.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold text-white">Transparent</h4>
              <p className="text-gray-400 mt-2">Built on blockchain technology for fairness.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold text-white">Community-Driven</h4>
              <p className="text-gray-400 mt-2">Your input shapes the future of our platform.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} NFT Lootboxes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
