"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LootboxList from "@/components/LootboxList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">Open Your Lootbox</h2>
          <p className="text-gray-300 mb-8">
            Explore, discover, and collect unique NFTs by opening lootboxes.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded">
            Start Now
          </button>
        </section>
        <LootboxList />
      </main>

      <Footer />
    </div>
  );
}