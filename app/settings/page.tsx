"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">Account</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>
                    Settings
                </h1>
                <p className="text-gray-600 mt-2 mb-8">Manage your account and preferences.</p>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                        Account Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                {user.email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 text-sm font-mono break-all">
                                {user.id}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                {new Date(user.created_at || '').toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password & Security */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                        Password & Security
                    </h2>
                    <div className="space-y-4">
                        <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <div className="font-medium text-gray-900">Change Password</div>
                                <div className="text-sm text-gray-500">Update your password</div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                        Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4 py-3">
                            <div>
                                <div className="font-medium text-gray-900">Email Notifications</div>
                                <div className="text-sm text-gray-500">Receive updates about your account</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-3xl border border-red-200 p-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                        Danger Zone
                    </h2>
                    <div className="space-y-4">
                        <button className="w-full px-4 py-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-between gap-3 border border-red-200">
                            <div className="min-w-0">
                                <div className="font-medium text-red-900">Delete Account</div>
                                <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                            </div>
                            <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
