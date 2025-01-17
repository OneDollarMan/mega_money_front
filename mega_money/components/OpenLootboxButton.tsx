"use client"
import { useAuth } from "./AuthContext";

export default function OpenLootboxButton(props: {selectedLootboxId: number}) {
    const { accessToken } = useAuth()

    const openLootbox = async () => {
        const response = await fetch('http://localhost:8000/lootboxes/open', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({ id: props.selectedLootboxId }),
        });
        const resp_data = await response.json();
        console.debug(resp_data);
    }

    return (
        <button 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded mb-6"
        onClick={openLootbox}
        >
            Open Lootbox
        </button>
    );
}