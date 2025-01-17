export default function Footer() {
    return (
        <footer className="bg-gray-800 py-6">
            <div className="container mx-auto text-center">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} NFT Lootboxes. All rights reserved.</p>
            </div>
        </footer>
    );
}