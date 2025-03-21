"use client"
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { BACKEND_ROOT_PATH } from "./config";
import { useEffect } from "react";

const fetchTonProofPayloadFromBackend = async () => {
    const response = await fetch(`${BACKEND_ROOT_PATH}/auth/payload`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return (await response.json()).payload;
}

export const ConnectAndSignButton = () => {
    const [tonConnectUI] = useTonConnectUI();
    tonConnectUI?.setConnectRequestParameters({ state: 'loading' });

    useEffect(() => {
        const fetchPayload = async () => {
            const tonProofPayload = await fetchTonProofPayloadFromBackend();
            tonConnectUI?.setConnectRequestParameters({
                state: "ready",
                value: { tonProof: tonProofPayload }
            });
        }
        fetchPayload();
    }, [tonConnectUI]);

    return (
        <TonConnectButton />
    );
};