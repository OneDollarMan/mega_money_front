"use client";
import { useAuth } from "./AuthContext";

export default function OpenLootboxButton(props: { selectedLootboxId: number }) {
    const { accessToken, logout } = useAuth();

    const openLootbox = async () => {
        const response = await fetch('http://localhost:8000/lootboxes/open', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({ id: props.selectedLootboxId }),
        });
        if (response.status == 401) {
            logout();
            return;
        }

        const resp_data = await response.json();
        // Handle the response data (e.g., show the prize won)
    };

    return (
        <button
            className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:from-teal-500 hover:to-green-400 hover:shadow-2xl transform transition-all hover:scale-105 active:scale-95"
            onClick={openLootbox}
        >
            Open Lootbox
        </button>
    );
}