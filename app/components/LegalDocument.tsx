import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LegalDocument({
    eyebrow,
    title,
    updated,
    children,
}: {
    eyebrow: string;
    title: string;
    updated: string;
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
                <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">{eyebrow}</p>
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
                        style={{ fontFamily: "var(--font-bungee)" }}
                    >
                        {title}
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">Last updated {updated}</p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">{children}</div>
                </article>
            </main>
            <Footer />
        </div>
    );
}

export function LegalLead({ children }: { children: ReactNode }) {
    return <div className="md:col-span-2">{children}</div>;
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="bg-white rounded-3xl border border-slate-200 p-6 h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-bungee)" }}>
                {title}
            </h2>
            <div className="space-y-3">{children}</div>
        </section>
    );
}

export function RelatedLinks() {
    return (
        <p className="md:col-span-2 text-sm text-gray-500">
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
                Privacy Policy
            </Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">
                Terms of Use
            </Link>
            <span className="mx-2">·</span>
            <Link href="/#faq" className="text-indigo-600 hover:text-indigo-700">
                FAQ
            </Link>
        </p>
    );
}
