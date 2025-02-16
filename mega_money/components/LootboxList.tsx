"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LootboxModal from "@/components/LootboxModal";
import { LootboxInfo } from "./Models";
import { BACK_ROOT_PATH } from "./config";

async function loadLootboxes() {
    const response = await fetch(`${BACK_ROOT_PATH}/lootboxes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const resp_data = await response.json();
    return resp_data;
}

function Lootboxes({ lootboxesList, openModal }: { lootboxesList: Array<LootboxInfo>, openModal: (lootbox: LootboxInfo) => void }) {
    return (
        <>
            {lootboxesList.map((lootbox, index) => (
                <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg text-center transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
                    onClick={() => openModal(lootbox)}
                >
                    <span className="text-lg font-semibold text-gray-300">{lootbox.name}</span>
                    <div className="bg-gray-700 h-48 rounded-lg my-4 flex items-center justify-center overflow-hidden relative">
                        <Image
                            src={lootbox.image_url}
                            alt={lootbox.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
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
    const [lootboxes, setLootboxes] = useState<Array<LootboxInfo>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLootboxes = async () => {
            try {
                const data = await loadLootboxes();
                setLootboxes(data);
            } catch (error) {
                console.error("Failed to load lootboxes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLootboxes();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

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
                    {isLoading ? (
                        <div className="col-span-full text-center text-gray-400">
                            Loading lootboxes...
                        </div>
                    ) : (
                        <Lootboxes lootboxesList={lootboxes} openModal={openModal} />
                    )}
                </div>
            </section>
            {isModalOpen && (
                <LootboxModal selectedLootbox={selectedLootbox} closeModalFunc={closeModal} />
            )}
        </>
    );
}