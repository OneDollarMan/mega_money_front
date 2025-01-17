"use client"
import { Suspense, use, useState } from "react";
import LootboxModal from "@/components/LootboxModal";
import { LootboxInfo } from "./Models";

async function loadLootboxes() {
    const response = await fetch('http://localhost:8000/lootboxes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp_data = await response.json();
    return resp_data;
}

function Lootboxes({ dataPromise, openModal }: { dataPromise: Promise<Array<LootboxInfo>>, openModal: Function }) {
    const lootboxesList: Array<LootboxInfo> = use(dataPromise);

    return (
        <>
            {lootboxesList.map((lootbox, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                    <span className="text-gray-400">{lootbox.name}</span>
                    <div
                        className="bg-gray-700 h-40 rounded-lg mb-4 flex items-center justify-center cursor-pointer"
                        onClick={() => openModal(lootbox)}
                    >
                        <img src={lootbox.image_url} />
                    </div>
                    <button
                        onClick={() => openModal(lootbox)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Open
                    </button>
                </div>
            ))}
        </>
    );
}


export default function LootboxList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLootbox, setSelectedLootbox] = useState<LootboxInfo | null>(null);

    const openModal = (lootbox: LootboxInfo) => {
        setSelectedLootbox(lootbox);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLootbox(null);
    };

    return (
        <>
            <section className="mt-12">
                <h3 className="text-2xl font-bold text-green-500 mb-4">Lootboxes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Lootboxes dataPromise={loadLootboxes()} openModal={openModal} />
                    </Suspense>
                </div>
            </section>
            {
                isModalOpen && (
                    <LootboxModal selectedLootbox={selectedLootbox} closeModalFunc={closeModal} />
                )
            }
        </>
    );
}