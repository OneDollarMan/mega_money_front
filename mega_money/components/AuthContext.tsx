"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BACKEND_ROOT_PATH } from "./config";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { TonProofBody } from "./Models";

interface AuthContextProps {
    accessToken: string | null;
    userBalance: string | null;
    login: (arg0: string, arg1: string) => void;
    logout: () => void;
    refreshUserBalance: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [tonConnectUI] = useTonConnectUI();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }

        if (accessToken) {
            refreshUserBalance();
        }

        tonConnectUI.onStatusChange(async (wallet) => {
            if (
                wallet?.connectItems?.tonProof &&
                "proof" in wallet.connectItems.tonProof
            ) {
                const tonProofBody = wallet.connectItems.tonProof as TonProofBody
                tonProofBody.address = wallet.account.address;
                tonProofBody.publicKey = wallet.account.publicKey;
                await getToken(tonProofBody);
            } else if (!wallet) {
                logout();
            }
            
        });

    }, [accessToken, tonConnectUI]);

    const getToken = async (tonProof: TonProofBody) => {
        try {
            const response = await fetch(`${BACKEND_ROOT_PATH}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tonProof)
            });

            if (!response.ok) {
                throw new Error(`Failed to verify tonProof: ${response.statusText}`);
            }

            const data = await response.json();
            login(data.accessToken);
        } catch (err) {
            console.error("Error verifying tonProof:", err);
            logout();
        }
    }

    const login = (token: string) => {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("walletAddress");
        }
        setAccessToken(null);
        setUserBalance(null);
        if (tonConnectUI.connected) {
            tonConnectUI.disconnect()
        }
    };

    const refreshUserBalance = async () => {
        try {
            const response = await fetch(`${BACKEND_ROOT_PATH}/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.statusText}`);
            }

            const userData = await response.json();
            setUserBalance(userData.balance);
        } catch (err) {
            console.error("Error fetching user balance:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, userBalance, login, logout, refreshUserBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};