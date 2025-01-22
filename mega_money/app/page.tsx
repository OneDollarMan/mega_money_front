"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LootboxList from "@/components/LootboxList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-6">
            Open Your Lootbox
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore, discover, and collect unique NFTs by opening lootboxes. Dive into the world of digital collectibles and unlock rare treasures!
          </p>
        </section>
        <LootboxList />
      </main>
      <Footer />
    </div>
  );
}