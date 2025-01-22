export default function Footer() {
    return (
        <footer className="bg-gray-800/90 backdrop-blur-md border-t border-gray-700 py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Branding Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                            NFT Lootboxes
                        </h3>
                        <p className="text-gray-400">
                            Explore, discover, and collect unique NFTs by opening lootboxes.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Marketplace</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-200">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.341 1.088.734 1.276 1.722.916 1.922.7.06-.544.21-.916.384-1.126-1.347-.242-2.763-1.244-2.763-2.908 0-.64.228-1.194.6-1.615-.2-.504-.45-.96-.45-.96s.37-.324 1.206-.242c2.45.492 3.91 2.42 3.91 4.917 0 2.65-2.14 4.78-4.78 4.78-1.62 0-3.06-.84-3.82-2.14-.24-.58-.36-1.21-.36-1.86 0-1.31.56-2.48 1.51-3.38-.15-.37-.6-1.86.15-3.8 0 0 1.23-.39 4.03 1.29a13.94 13.94 0 013.7-.49c1.26.01 2.52.17 3.7.49 2.8-1.68 4.03-1.29 4.03-1.29.75 1.94.3 3.43.15 3.8.95.9 1.51 2.07 1.51 3.38 0 2.65-2.14 4.78-4.78 4.78-1.62 0-3.06-.84-3.82-2.14-.24-.58-.36-1.21-.36-1.86 0-1.31.56-2.48 1.51-3.38z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.882 1.44 1.44 0 000-2.882z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} NFT Lootboxes. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}