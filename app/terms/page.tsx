import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalLead, LegalSection, RelatedLinks } from "../components/LegalDocument";

export const metadata: Metadata = {
    title: "Terms of Use - Monkify",
    description: "The rules for using Monkify’s AI Humanizer.",
};

export default function TermsPage() {
    return (
        <LegalDocument eyebrow="Support" title="Terms of Use" updated="October 2, 2026">
            <LegalLead>
                <p>
                    These terms cover your use of Monkify. By creating an account or using the AI Humanizer, you agree to them and to the{" "}
                    <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </LegalLead>

            <LegalSection title="The service">
                <p>
                    Monkify provides an AI Humanizer. You submit a draft, choose an intensity, and receive a rewrite meant to sound more natural while keeping the original point. An account is required to run the tool.
                </p>
                <p>
                    The rewrite is a draft for you to read and edit. Monkify does not promise that the result will avoid AI detection, match a grade, or preserve every nuance of the original. Check the output before you use it.
                </p>
            </LegalSection>

            <LegalSection title="Your account">
                <p>
                    You need a valid email address and a password of at least 6 characters, or a Google or GitHub sign-in. Keep your login private. You are responsible for activity on your account. If you believe someone else is using it, sign out and reset your password from the sign-in page.
                </p>
            </LegalSection>

            <LegalSection title="Acceptable use">
                <p>You may use Monkify to revise writing you have the right to edit. You may not:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Submit text you do not have permission to process</li>
                    <li>Use the service to break the law, harass someone, or distribute harmful content</li>
                    <li>Probe, scrape, overload, or interfere with the service</li>
                    <li>Share your account or resell access</li>
                </ul>
            </LegalSection>

            <LegalSection title="Academic work">
                <p>
                    Monkify is a revision aid. Your school, instructor, or publisher decides what counts as acceptable help. Submitting a rewrite as solely your own work can violate those rules. You are responsible for disclosing AI assistance when it is required, and for the final text you turn in.
                </p>
            </LegalSection>

            <LegalSection title="Your writing">
                <p>
                    You keep ownership of the text you submit and of the rewrite returned to you. You give Monkify permission to process that text only to produce the result for your request. We do not claim ownership of your drafts.
                </p>
            </LegalSection>

            <LegalSection title="Availability">
                <p>
                    The service is provided as it is. Features, intensity modes, and limits can change. We may suspend an account that breaks these terms, and we may pause the service for maintenance or when a processing provider is unavailable.
                </p>
            </LegalSection>

            <LegalSection title="Liability">
                <p>
                    To the extent the law allows, Monkify is not liable for grades, academic decisions, lost work, or other losses that come from relying on a rewrite. The tool can change wording. Reading the result is part of using it.
                </p>
            </LegalSection>

            <LegalSection title="Changes">
                <p>
                    We may update these terms. The date at the top of this page will change when we do. If you keep using Monkify after an update, the updated terms apply.
                </p>
            </LegalSection>

            <RelatedLinks />
        </LegalDocument>
    );
}
