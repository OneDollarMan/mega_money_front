import { MouseEventHandler } from "react";
import OpenLootboxButton from "./OpenLootboxButton";
import { LootboxInfo } from "./Models";

export default function LootboxModal(props: { selectedLootbox: LootboxInfo | null, closeModalFunc: MouseEventHandler }) {
    if (props.selectedLootbox == null) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={props.closeModalFunc}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-100"
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold text-green-500 mb-4">Lootbox {props.selectedLootbox.id}</h2>

                <div className="bg-gray-700 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Prize Wheel (Coming Soon)</span>
                </div>

                <OpenLootboxButton selectedLootboxId={props.selectedLootbox.id} />

                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">Prizes:</h3>
                    <ul className="text-gray-400">
                        {props.selectedLootbox.prizes.length > 0 ? props.selectedLootbox.prizes.map((prize) => (
                            <li key={prize.id}>[{prize.quality} - {prize.drop_chance * 100}%] {prize.name}</li>
                        )) : <>No prizes</>}
                    </ul>
                </div>
            </div>
        </div>
    );
}