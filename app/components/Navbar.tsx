"use client";

import Link from "next/link";

interface NavbarProps {
    onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
    return (
        <nav className="w-full bg-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>Monkify</span>
                    </Link>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onLoginClick}
                            className="px-6 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            Login
                        </button>
                        <Link
                            href="/signup"
                            className="px-6 py-2.5 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
