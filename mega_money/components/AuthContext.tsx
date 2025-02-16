"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BACK_ROOT_PATH } from "./config";

interface AuthContextProps {
    accessToken: string | null;
    walletAddress: string | null;
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
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }

        const storedWalletAddress = localStorage.getItem("walletAddress");
        if (storedWalletAddress) {
            setWalletAddress(storedWalletAddress);
        }
    }, []);

    const login = (token: string, wallet: string) => {
        setAccessToken(token);
        setWalletAddress(wallet)
        localStorage.setItem("accessToken", token);
        localStorage.setItem("walletAddress", wallet);
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("walletAddress");
        }
        setAccessToken(null);
        setWalletAddress(null);
        setUserBalance(null);
    };

    const refreshUserBalance = async () => {
        try {
            const response = await fetch(`${BACK_ROOT_PATH}/users/me`, {
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
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, walletAddress, userBalance, login, logout, refreshUserBalance }}>
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