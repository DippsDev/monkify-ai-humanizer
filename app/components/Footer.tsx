import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-flex items-center">
                            <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>
                                Monkify
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-600 max-w-xs leading-relaxed">
                            Turn robotic drafts into writing that sounds like you, without losing the point.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Tools</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="/#humanizer" className="hover:text-indigo-600 transition-colors">AI Humanizer</a></li>
                            <li><a href="/#features" className="hover:text-indigo-600 transition-colors">AI Detector</a></li>
                            <li><a href="/#features" className="hover:text-indigo-600 transition-colors">Plagiarism Checker</a></li>
                            <li><a href="/#features" className="hover:text-indigo-600 transition-colors">AI Chat</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="/#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a></li>
                            <li><a href="/#features" className="hover:text-indigo-600 transition-colors">Features</a></li>
                            <li><Link href="/signup" className="hover:text-indigo-600 transition-colors">Get started</Link></li>
                            <li><Link href="/settings" className="hover:text-indigo-600 transition-colors">Account</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="/#faq" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500">Copyright © 2026 Monkify. All rights reserved.</p>
                    <p className="text-xs text-gray-500">English</p>
                </div>
            </div>
        </footer>
    );
}
