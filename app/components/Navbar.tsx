"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useState, useEffect, useRef } from "react";

interface NavbarProps {
    onLoginClick?: () => void;
}

const navLinks = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#features", label: "Features" },
    { href: "/#faq", label: "FAQ" },
];

export default function Navbar({ onLoginClick }: NavbarProps) {
    const { user, signOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileRendered, setMobileRendered] = useState(false);
    const [mobileShown, setMobileShown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const [drawerTop, setDrawerTop] = useState(64);

    const handleSignOut = async () => {
        await signOut();
        setShowDropdown(false);
    };

    const handleLogin = () => {
        setMobileOpen(false);
        if (onLoginClick) {
            onLoginClick();
            return;
        }
        window.location.href = "/?login=true";
    };

    useEffect(() => {
        if (mobileOpen) {
            setMobileRendered(true);
            const frame = requestAnimationFrame(() => {
                requestAnimationFrame(() => setMobileShown(true));
            });
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                cancelAnimationFrame(frame);
                document.body.style.overflow = previousOverflow;
            };
        }

        setMobileShown(false);
        if (!mobileRendered) return;

        const timeout = window.setTimeout(() => setMobileRendered(false), 320);
        return () => window.clearTimeout(timeout);
    }, [mobileOpen, mobileRendered]);

    useEffect(() => {
        if (!mobileRendered) return;

        const updateTop = () => {
            setDrawerTop(navRef.current?.getBoundingClientRect().bottom ?? 64);
        };

        updateTop();
        window.addEventListener("resize", updateTop);
        return () => window.removeEventListener("resize", updateTop);
    }, [mobileRendered]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <>
        <nav ref={navRef} className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-3">
                    <Link href="/" className="flex items-center min-w-0">
                        <span className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                            Monkify
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                    title={user.email || "User profile"}
                                    aria-expanded={showDropdown}
                                    aria-haspopup="menu"
                                >
                                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm border-2 border-white">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-slate-100">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <div className="font-semibold text-gray-900 text-sm">Account</div>
                                            <div className="text-gray-500 text-xs truncate mt-1">{user.email}</div>
                                        </div>
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    setShowDropdown(false);
                                                    window.location.href = "/settings";
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-100 transition-colors"
                                            >
                                                Settings
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Sign in
                                </button>
                                <Link
                                    href="/signup"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
                                >
                                    Get started
                                </Link>
                            </>
                        )}

                        <button
                            type="button"
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-800"
                            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((open) => !open)}
                        >
                            {mobileOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {mobileRendered && (
            <div
                className={`md:hidden fixed inset-x-0 bottom-0 z-30 ${mobileShown ? "" : "pointer-events-none"}`}
                style={{ top: drawerTop }}
            >
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    className={`absolute inset-0 bg-slate-900/30 transition-opacity duration-300 ${mobileShown ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setMobileOpen(false)}
                />
                <div
                    className={`absolute inset-y-0 right-0 w-full bg-slate-50 px-4 py-4 shadow-xl transition-transform duration-300 ease-out ${mobileShown ? "translate-x-0" : "translate-x-full"}`}
                    onTransitionEnd={(event) => {
                        if (event.propertyName === "transform" && !mobileShown) setMobileRendered(false);
                    }}
                >
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-3 py-3 text-sm font-medium text-gray-800 hover:bg-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {!user && (
                            <button
                                onClick={handleLogin}
                                className="rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-800 hover:bg-white sm:hidden"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
