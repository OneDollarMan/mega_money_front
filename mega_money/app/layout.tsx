"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TonConnectUIProvider manifestUrl="http://191.96.11.165/static/frontend/tonconnect-manifest.json">
          <AuthProvider>
            {children}
          </AuthProvider>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}