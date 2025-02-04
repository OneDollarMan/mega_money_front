"use client";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "./AuthContext";
import { Prize } from "./Models";

export default function OpenLootboxButton(props: { selectedLootboxId: number, setPrize: (newPrize: Prize) => void, setError: Dispatch<SetStateAction<string | undefined>> }) {
    const { accessToken, logout, refreshUserBalance } = useAuth();

    const openLootbox = async () => {
        if(!accessToken) {
            return;
        }

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

        if (response.status == 400) {
            props.setError((await response.json()).detail)
            return;
        }

        const resp_data = await response.json();
        props.setPrize(resp_data);
        refreshUserBalance();
    };

    return (
        <button
            className={accessToken ? "w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:from-teal-500 hover:to-green-400 hover:shadow-2xl transform transition-all hover:scale-105 active:scale-95" 
                : "w-full bg-gradient-to-r from-gray-700 to-zinc-600 text-white font-bold py-4 px-8 rounded-lg text-2xl"}
            onClick={openLootbox}
            disabled={!accessToken}
        >
            {accessToken ? 'Open lootbox' : 'Authorize first!'}
        </button>
    );
}