import type { Metadata } from "next";
import LegalDocument, { LegalLead, LegalSection, RelatedLinks } from "../components/LegalDocument";

export const metadata: Metadata = {
    title: "Privacy Policy - Monkify",
    description: "How Monkify handles your account and the writing you submit to the AI Humanizer.",
};

export default function PrivacyPage() {
    return (
        <LegalDocument eyebrow="Support" title="Privacy Policy" updated="October 2, 2026">
            <LegalLead>
                <p>
                    Monkify is a writing tool. The AI Humanizer rewrites a draft so it reads more naturally, while you stay signed in to your account. This policy explains what we collect, what we do with it, and what we do not keep.
                </p>
            </LegalLead>

            <LegalSection title="Account information">
                <p>When you create an account, we collect:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Your name, if you provide one</li>
                    <li>Your email address</li>
                    <li>A password, stored by our authentication provider in hashed form. Monkify never sees the plain password.</li>
                </ul>
                <p>
                    Accounts are managed with Supabase. If you sign in with Google or GitHub, we receive the profile details those services share with us, usually your name and email. We use this information to create your account, keep you signed in, and show your details on the Settings page.
                </p>
            </LegalSection>

            <LegalSection title="Writing you submit">
                <p>
                    The AI Humanizer needs the text you paste or upload in order to rewrite it. That text is sent to our server for the request, then returned to your browser. Monkify does not save drafts or rewrites in its own database, and it does not use your writing to train a model.
                </p>
                <p>Depending on the intensity you choose, the draft may also be sent to a processor so the rewrite can be produced:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Light mode may send the draft to Google Gemini.</li>
                    <li>Medium and Heavy modes may send the draft to Google Cloud Translation for back-translation.</li>
                </ul>
                <p>
                    Those services process the text only to return a result for that request. If a provider is unavailable, Monkify falls back to rewriting on our server and still does not store the draft.
                </p>
            </LegalSection>

            <LegalSection title="Sessions">
                <p>
                    Supabase sets a session cookie so you stay signed in. We do not use advertising cookies or sell browsing data.
                </p>
            </LegalSection>

            <LegalSection title="Who we share data with">
                <p>We share information only with the services that run Monkify:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Supabase, for accounts and sign-in sessions</li>
                    <li>Google Gemini, when you use Light mode</li>
                    <li>Google Cloud Translation, when you use Medium or Heavy mode</li>
                </ul>
                <p>We do not sell personal information or your writing.</p>
            </LegalSection>

            <LegalSection title="How long we keep it">
                <p>
                    Account details stay for as long as the account exists. Writing you submit is used to produce the rewrite and is not kept by Monkify after that request finishes. A copy can remain in your browser until you leave the page or clear it.
                </p>
            </LegalSection>

            <LegalSection title="Your choices">
                <p>
                    You can review your email, user ID, and account date on the Settings page after you sign in. You can sign out at any time. Password resets are available from the sign-in flow.
                </p>
            </LegalSection>

            <LegalSection title="Students">
                <p>
                    Monkify is built for students revising their own drafts. You are responsible for your school’s rules on AI-assisted writing. A rewrite is a starting point. It does not guarantee that a draft will pass any detector, and it does not replace your own review.
                </p>
            </LegalSection>

            <LegalSection title="Changes">
                <p>
                    If this policy changes, the date at the top of the page will change with it. Continued use of Monkify after an update means the updated policy applies.
                </p>
            </LegalSection>

            <LegalSection title="Questions">
                <p>
                    Privacy questions about an existing account can be handled from Settings while you are signed in. The FAQ on the home page covers how detection, rewriting, and privacy work in everyday use.
                </p>
            </LegalSection>

            <RelatedLinks />
        </LegalDocument>
    );
}
