"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            question: "What is humanizing AI text?",
            answer: "Humanizing is rewriting a draft so it reads with a more natural rhythm, word choice, and sentence shape, while the original meaning stays in place. That is what Monkify does.",
        },
        {
            question: "How does AI detection work?",
            answer: "Detection looks at patterns that show up often in machine writing: even sentence length, stock phrases, and predictable structure. Monkify’s report highlights those stretches so you can see what to revise.",
        },
        {
            question: "Can it detect a mix of human and AI writing?",
            answer: "Yes. Mixed drafts are broken into pure AI text, light edits, and writing that already sounds human, so you know which parts need the most attention.",
        },
        {
            question: "Does rewriting guarantee the text won't be detected?",
            answer: "No tool can promise that. Monkify makes the draft sound more natural and shows you what still looks mechanical. Read the result, keep your own voice, and treat the rewrite as a starting point.",
        },
        {
            question: "Will my text be stored or shared?",
            answer: "Your text is processed securely and is not stored on our servers or shared with third parties. Once you close your session, your content is permanently deleted.",
        },
        {
            question: "Is this tool useful for students?",
            answer: "Monkify is built for students who want drafts to sound clear and like them. It shows where the writing feels robotic so you can revise with more control.",
        },
    ];

    return (
        <section id="faq" className="bg-white py-16 sm:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-bungee)" }}>
                        Frequently asked questions
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Still curious? The answers below cover detection, rewriting, and privacy.
                    </p>
                </div>

                <div className="divide-y divide-slate-200 border-y border-slate-200">
                    {faqs.map((faq, index) => {
                        const open = openIndex === index;
                        return (
                            <div key={faq.question}>
                                <button
                                    onClick={() => setOpenIndex(open ? null : index)}
                                    className="w-full py-5 flex items-center justify-between text-left gap-4"
                                    aria-expanded={open}
                                >
                                    <span className="text-base font-semibold text-gray-900">{faq.question}</span>
                                    <span className="text-indigo-1000 text-xl leading-none shrink-0" aria-hidden="true">
                                        {open ? "–" : "+"}
                                    </span>
                                </button>
                                {open && (
                                    <p className="pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
