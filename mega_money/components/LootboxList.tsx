"use client";
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
                <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
                    onClick={() => openModal(lootbox)}
                >
                    <span className="text-lg font-semibold text-gray-300">{lootbox.name}</span>
                    <div className="bg-gray-700 h-48 rounded-lg my-4 flex items-center justify-center overflow-hidden">
                        <img
                            src={lootbox.image_url}
                            alt={lootbox.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent div's onClick from firing
                            openModal(lootbox);
                        }}
                        className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:from-teal-500 hover:to-green-400 transition-all"
                    >
                        {Math.round(lootbox.open_price)} T
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
            <section className="mt-12 animate-fade-in">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-8">
                    Lootboxes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Suspense fallback={
                        <div className="col-span-full text-center text-gray-400">
                            Loading lootboxes...
                        </div>
                    }>
                        <Lootboxes dataPromise={loadLootboxes()} openModal={openModal} />
                    </Suspense>
                </div>
            </section>
            {isModalOpen && (
                <LootboxModal selectedLootbox={selectedLootbox} closeModalFunc={closeModal} />
            )}
        </>
    );
}