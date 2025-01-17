"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    accessToken: string | null;
    walletAddress: string | null;
    login: (arg0: string, arg1: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }

        const storedWalletAddress = localStorage.getItem("walletAddress");
        if (storedWalletAddress) {
            setWalletAddress(storedWalletAddress);
        }
    });

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
    };

    return (
        <AuthContext.Provider value={{ accessToken, walletAddress, login, logout }}>
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