"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const SAMPLE_TEXT =
    "Training at the gym has many benefits for both physical and mental health. One similarity across many sources is that exercise improves strength and endurance. Another common idea claims that physical activity reduces stress and improves mood, especially after regular workouts. A third point often mentioned is that consistent exercise helps build long-term habits, which makes it easier to stay active.";

const DETECTORS = [
    { name: "GPTZero", src: "/logos/gptzero.svg", className: "h-6 w-auto" },
    { name: "Originality.ai", src: "/logos/originality.svg", className: "h-5 w-auto" },
    { name: "Scribbr", src: "/logos/scribbr.svg", className: "h-7 w-auto" },
];

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const [inputText, setInputText] = useState("");
    const [humanizedText, setHumanizedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const [intensity, setIntensity] = useState<"light" | "medium" | "heavy">("heavy");

    const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("login") === "true") {
            setIsLoginOpen(true);
        }
    }, []);

    const handleHumanize = async () => {
        if (!user) {
            setError("Please create an account or log in to use Monkify");
            setTimeout(() => {
                router.push("/signup");
            }, 1500);
            return;
        }

        if (!inputText.trim()) {
            setError("Please enter some text to humanize");
            return;
        }

        setIsLoading(true);
        setError("");
        setHumanizedText("");

        try {
            const response = await fetch("/api/humanize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText, intensity }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to humanize text");
            }

            setHumanizedText(data.humanizedText);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputText(text);
            setHumanizedText("");
            setCopySuccess(false);
        } catch {
            setError("Failed to paste from clipboard");
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(humanizedText);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch {
            setError("Failed to copy to clipboard");
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedExtensions = ["pdf", "doc", "docx"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            setError("Only PDF and Word files (.pdf, .doc, .docx) are allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return;
        }

        setIsUploadingFile(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload file");
            }

            setInputText(data.text);
            setCopySuccess(false);
            setHumanizedText("");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to upload file";
            setError(message);
        } finally {
            setIsUploadingFile(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            {showBanner && (
                <div className="bg-indigo-600 text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 relative">
                        <a href="#humanizer" className="text-sm font-medium text-center pr-8">
                            Heavy intensity is live. Paste a draft and humanize it in one pass.
                        </a>
                        <button
                            type="button"
                            onClick={() => setShowBanner(false)}
                            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-indigo-700"
                            aria-label="Dismiss banner"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <Navbar onLoginClick={() => setIsLoginOpen(true)} />

            <main>
                <section id="humanizer" className="bg-slate-50 pt-12 pb-8 sm:pt-20 sm:pb-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4">AI Humanizer</p>
                        <h1
                            className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-gray-900"
                            style={{ fontFamily: "var(--font-bungee)" }}
                        >
                            The <span className="text-indigo-1000">AI Humanizer</span>
                            <br />
                            that actually works
                        </h1>
                        <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
                            Keep the meaning, context, and natural rhythm of your writing. Monkify turns stiff AI drafts into clear text you can actually read out loud.
                        </p>

                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col min-h-[340px]">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">Original input</span>
                                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 rounded-full px-2.5 py-1">
                                        AI draft
                                    </span>
                                </div>
                                <textarea
                                    placeholder="Type or paste AI-generated text here, or try a sample."
                                    className="w-full flex-1 min-h-[180px] text-gray-800 resize-none focus:outline-none leading-relaxed"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                                <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-xs text-gray-500">Words: {wordCount}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setInputText(SAMPLE_TEXT);
                                                setHumanizedText("");
                                                setError("");
                                            }}
                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                        >
                                            Try a sample
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handlePaste}
                                            className="text-xs font-medium text-gray-700 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-100"
                                        >
                                            Paste
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled
                                            title="Feature coming soon"
                                            className="text-xs font-medium text-gray-400 bg-gray-100 rounded-full px-3 py-1.5 cursor-not-allowed"
                                        >
                                            {isUploadingFile ? "Uploading..." : "Upload"}
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            aria-label="Upload PDF or Word file"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-indigo-200 shadow-sm p-5 sm:p-6 flex flex-col min-h-[340px]">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-700">Humanized</span>
                                    {humanizedText && (
                                        <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-700 bg-indigo-100 rounded-full px-2.5 py-1">
                                            Ready
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {isLoading && <p className="text-gray-500">Humanizing text...</p>}
                                    {!isLoading && humanizedText && humanizedText}
                                    {!isLoading && !humanizedText && (
                                        <p className="text-gray-400">Your humanized draft will show up here.</p>
                                    )}
                                </div>
                                {humanizedText && (
                                    <div className="pt-4 mt-2 border-t border-indigo-100 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={handleCopyToClipboard}
                                            className="text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full px-3 py-1.5 hover:bg-indigo-100"
                                        >
                                            {copySuccess ? "Copied" : "Copy the text"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setInputText("");
                                                setHumanizedText("");
                                                setError("");
                                                setCopySuccess(false);
                                            }}
                                            className="text-xs font-medium text-gray-600 bg-gray-50 rounded-full px-3 py-1.5 hover:bg-gray-100"
                                        >
                                            Start over
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-medium text-gray-600 mr-1">Intensity</span>
                                {(["light", "medium", "heavy"] as const).map((level) => {
                                    const available = level === "heavy";
                                    const selected = intensity === level;
                                    return (
                                        <button
                                            key={level}
                                            type="button"
                                            disabled={!available}
                                            title={available ? undefined : "Coming soon"}
                                            onClick={() => available && setIntensity(level)}
                                            className={`px-4 py-2 text-xs font-medium rounded-full capitalize transition-colors ${
                                                !available
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : selected
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-white text-gray-700 border border-slate-200 hover:bg-slate-100"
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                type="button"
                                onClick={handleHumanize}
                                disabled={isLoading || !inputText.trim() || loading}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                title={!user && !loading ? "Please log in or sign up to use Monkify" : undefined}
                            >
                                {isLoading ? "Humanizing..." : "Humanize"}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 pb-14">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm font-medium text-gray-600 mb-5">Double-checked with</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {DETECTORS.map((detector) => (
                                <span
                                    key={detector.name}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-5"
                                >
                                    <img src={detector.src} alt={detector.name} className={detector.className} />
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                                See why students choose Monkify
                            </h2>
                            <p className="mt-3 text-gray-600">Same meaning, less of the machine cadence.</p>
                        </div>
                        <TestimonialsMarquee />
                    </div>
                </section>

                <section className="bg-slate-50 py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                                Natural results
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Detectors look for even sentences, stock phrases, and word choices that never vary. Monkify restructures those stretches so the draft keeps your point and reads with more human variation. Compare the highlighted lines.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                            <article className="bg-white rounded-3xl p-6 border border-slate-200 min-h-[260px]">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 mb-4">Predictable AI phrasing</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Training at the gym has many benefits for <mark className="bg-slate-200 px-1 rounded">both physical and mental health.</mark> One similarity <mark className="bg-slate-200 px-1 rounded">across many sources</mark> is that <mark className="bg-slate-200 px-1 rounded">exercise improves strength and endurance.</mark> A third point <mark className="bg-slate-200 px-1 rounded">often mentioned</mark> is that consistent exercise helps build long-term habits.
                                </p>
                            </article>
                            <article className="bg-white rounded-3xl p-6 border border-indigo-200 min-h-[260px]">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-700 mb-4">Natural language variation</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Training at the gym comes with real benefits for physical and <mark className="bg-indigo-100 px-1 rounded">mental well-being.</mark> <mark className="bg-indigo-100 px-1 rounded">One of them says that</mark> regular exercise increases strength and endurance. Regular training can also help people build lasting habits, which <mark className="bg-indigo-100 px-1 rounded">makes staying active much easier over time.</mark>
                                </p>
                            </article>
                        </div>

                        <div className="mt-8 grid lg:grid-cols-2 gap-4">
                            <div className="bg-white rounded-3xl border border-slate-200 p-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-4">Analysis report</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    <mark className="bg-red-100 px-1 rounded">Most experts agree that adults usually need about 7 hours of sleep. Studies suggest that sleep helps the brain work better.</mark>{" "}
                                    <mark className="bg-green-100 px-1 rounded">People who don&apos;t get enough sleep are</mark>{" "}
                                    <mark className="bg-red-100 px-1 rounded">more likely to have trouble concentrating.</mark>{" "}
                                    <mark className="bg-yellow-100 px-1 rounded">Sleeping too much can sometimes be harmful, so balance matters.</mark>
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl border border-slate-200 p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
                                            <circle cx="32" cy="32" r="26" stroke="#e0e7ff" strokeWidth="6" fill="none" />
                                            <circle cx="32" cy="32" r="26" stroke="#4f46e5" strokeWidth="6" fill="none" strokeDasharray="163" strokeDashoffset="44" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">73%</div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">AI detection results</p>
                                        <p className="mt-1 font-semibold text-gray-900">Likely AI-generated</p>
                                        <p className="text-sm text-gray-600">A large part of this sample still matches typical AI writing.</p>
                                    </div>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { label: "Pure AI text", value: "73%", width: "73%", bar: "bg-indigo-600", note: "Closely matches typical AI patterns" },
                                        { label: "Human-written", value: "6%", width: "6%", bar: "bg-indigo-800", note: "Already sounds like a person" },
                                        { label: "AI with edits", value: "21%", width: "21%", bar: "bg-indigo-300", note: "AI text with small human edits" },
                                    ].map((row) => (
                                        <li key={row.label}>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium text-gray-900">{row.label}</span>
                                                <span className="font-semibold">{row.value}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{row.note}</p>
                                            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${row.bar}`} style={{ width: row.width }} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-indigo-600">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                                Stop rewriting. Start humanizing.
                            </h2>
                            <p className="mt-3 text-indigo-100">Paste any AI text and see a more natural draft in seconds.</p>
                        </div>
                        <a
                            href="#humanizer"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-indigo-600 hover:bg-slate-100"
                        >
                            Try it on your own text
                        </a>
                    </div>
                </section>

                <section id="how-it-works" className="bg-white py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                            How it works
                        </h2>
                        <p className="mt-3 max-w-2xl text-gray-600">Generate, paste, humanize, then read it back in your own voice.</p>
                        <ol className="mt-10 grid md:grid-cols-3 gap-4">
                            {[
                                {
                                    step: "1",
                                    title: "Paste your AI content",
                                    body: "Draft in ChatGPT, Claude, Gemini, or any other writer. Copy the text into Monkify, or start from the sample.",
                                },
                                {
                                    step: "2",
                                    title: "Humanize",
                                    body: "Monkify rewrites sentence rhythm and stock phrasing while holding onto the original meaning. Heavy intensity is available now.",
                                },
                                {
                                    step: "3",
                                    title: "Read and revise",
                                    body: "Copy the result, then check the highlighted report so you can see what still sounds mechanical before you submit or publish.",
                                },
                            ].map((item) => (
                                <li key={item.step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                        {item.step}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section id="features" className="bg-slate-50 py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-sm text-indigo-600 font-medium mb-2">Features</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                            <span className="text-indigo-1000">All-in-one</span> writing toolkit
                        </h2>
                        <p className="mt-3 max-w-2xl text-gray-600">The tools around a draft: rewrite it, see what looks generated, and keep polishing.</p>

                        <div className="mt-10 grid md:grid-cols-2 gap-4">
                            {[
                                {
                                    title: "AI Humanizer",
                                    body: "Rewrite AI text so it sounds natural and specific, without changing what you meant to say.",
                                },
                                {
                                    title: "AI Detector",
                                    body: "See how much of a passage matches typical AI writing, with a breakdown you can act on.",
                                },
                                {
                                    title: "Plagiarism Checker",
                                    body: "Scan for overlap so a rewrite stays original instead of echoing someone else’s sentences.",
                                },
                                {
                                    title: "AI Chat",
                                    body: "Ask for a clearer version of a paragraph, then humanize the parts that still feel stiff.",
                                },
                            ].map((feature) => (
                                <article key={feature.title} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
                                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-gray-600 leading-relaxed">{feature.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-3xl" style={{ fontFamily: "var(--font-bungee)" }}>
                            A simpler way through a rough draft
                        </h2>
                        <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
                            Monkify stays on one page: paste, choose how far to rewrite, and take the result with you. No extra tools to juggle for the first pass.
                        </p>
                        <div className="mt-10 grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Start from the draft you have", body: "You don’t need a new prompt. Drop in the text that already says the right thing and clean the voice." },
                                { title: "Pick the rewrite strength", body: "Heavy is live today. It pushes further from robotic phrasing. Lighter passes are on the way." },
                                { title: "Keep the point intact", body: "The rewrite is there to change rhythm and wording, not to invent a different argument." },
                                { title: "Copy it when it sounds like you", body: "Read it once. If a line still feels off, edit that line. Then copy the rest." },
                            ].map((item) => (
                                <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                    <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                            What changes
                        </h2>
                        <p className="mt-3 text-gray-600">A plain look at an untouched AI draft next to a Monkify pass.</p>
                        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
                            <table className="w-full min-w-[640px] text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="px-5 py-4 font-medium text-gray-500"> </th>
                                        <th className="px-5 py-4 font-semibold text-gray-900">Raw AI draft</th>
                                        <th className="px-5 py-4 font-semibold text-indigo-600">Monkify</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        ["Sentence rhythm", "Even length, same shape", "Shorter and longer lines mixed"],
                                        ["Phrasing", "Stock openers and transitions", "More specific wording"],
                                        ["Meaning", "Whatever the model wrote", "Held to the original point"],
                                        ["Your next step", "Rewrite it by hand", "Read, tweak, and copy"],
                                    ].map(([label, raw, monkify]) => (
                                        <tr key={label}>
                                            <th className="px-5 py-4 font-medium text-gray-900">{label}</th>
                                            <td className="px-5 py-4 text-gray-600">{raw}</td>
                                            <td className="px-5 py-4 text-gray-900">{monkify}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <FAQ />
            </main>

            <Footer />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignUp={() => {
                    setIsLoginOpen(false);
                    window.location.href = "/signup";
                }}
                onForgotPassword={() => {
                    setIsLoginOpen(false);
                    setIsForgotPasswordOpen(true);
                }}
            />

            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
                onBackToLogin={() => {
                    setIsForgotPasswordOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </div>
    );
}
