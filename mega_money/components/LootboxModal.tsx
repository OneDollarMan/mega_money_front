import { MouseEventHandler, useState, useEffect } from "react";
import { LootboxInfo, Prize } from "./Models";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import OpenLootboxButton from "./OpenLootboxButton";

export default function LootboxModal(props: {
    selectedLootbox: LootboxInfo | null,
    closeModalFunc: MouseEventHandler
}) {
    const [prize, setPrize] = useState<Prize>();
    const [error, setError] = useState<string>();
    const [showPrizeReveal, setShowPrizeReveal] = useState(false);

    useEffect(() => {
        if (prize) {
            setShowPrizeReveal(true);
        }
    }, [prize]);

    if (props.selectedLootbox == null) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg relative transform transition-all">
                {/* Close Button */}
                <button
                    onClick={props.closeModalFunc}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-100 transition-colors"
                >
                    ✖
                </button>

                {/* Modal Header */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-6">
                    {props.selectedLootbox.name}
                </h2>

                {/* Prize Wheel Section */}
                <div className="bg-gray-700 h-48 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
                    <AnimatePresence>
                        {!showPrizeReveal ? (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span className="text-gray-400 text-lg">
                                    {error ? error : 'Your prize will be here'}
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-purple-900/50 to-indigo-900/50"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-2 mb-2"
                                >
                                    <Trophy className="w-8 h-8 text-yellow-400" />
                                    <span className="text-xl font-bold text-white">
                                        Congratulations!
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="relative"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Sparkles className="absolute -left-6 -top-4 w-4 h-4 text-yellow-400" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                        {prize?.name}
                                    </span>
                                    <Sparkles className="absolute -right-6 -bottom-4 w-4 h-4 text-yellow-400" />
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-2 text-sm text-gray-300"
                                >
                                    Quality: <span className="text-green-400 font-semibold">{prize?.quality}</span><br />
                                    Prize amount: <span className="text-green-400 font-semibold">{prize?.tokens_amount}</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="w-full h-full bg-gradient-to-r from-green-400/10 to-teal-500/10 animate-spin-slow"></div>
                </div>

                {/* Open Lootbox Button */}
                <div className="mb-6">
                    <OpenLootboxButton
                        lootboxId={props.selectedLootbox.id}
                        lootboxPrice={props.selectedLootbox.open_price}
                        setPrize={(newPrize: Prize) => {
                            setShowPrizeReveal(false);
                            setPrize(newPrize);
                        }}
                        setError={setError}
                    />
                </div>

                {/* Prizes Section */}
                <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Prizes:</h3>
                    <ul className="space-y-2">
                        {props.selectedLootbox.prizes.length > 0 ? (
                            props.selectedLootbox.prizes.map((prize) => (
                                <li
                                    key={prize.id}
                                    className="flex justify-between items-center bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors"
                                >
                                    <span className="text-gray-300">
                                        {prize.name} - {Math.round(prize.tokens_amount)} T <span className="text-green-400">({prize.quality})</span>
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {Math.round(prize.drop_chance * 100)}% chance
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400">No prizes available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}