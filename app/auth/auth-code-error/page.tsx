import Link from "next/link";

export default async function AuthCodeErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; error_code?: string; error_description?: string }>;
}) {
    const params = await searchParams;
    const error = params.error ?? "";
    const description = params.error_description ?? "";

    let title = "Sign-in did not finish";
    let detail = "Google or GitHub sent you back without a login. Try again from the home page.";

    if (error === "access_denied") {
        title = "Sign-in was refused";
        detail = "This happens when the consent screen is closed or cancelled. If you did continue, the Google app is still in Testing and that Gmail address is not listed as a test user. In Google Cloud, open the OAuth consent screen and add the address under Test users, then try again.";
    } else if (description.toLowerCase().includes("exchange") || params.error_code === "unexpected_failure") {
        title = "The provider could not finish sign-in";
        detail = "Supabase accepted the redirect, then could not trade the code for a session. In the Supabase provider settings, the client secret needs to match the secret from the Google or GitHub app. Paste it again, save, and retry.";
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
                <Link href="/" className="inline-flex items-center">
                    <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>
                        Monkify
                    </span>
                </Link>
                <div className="mt-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">Sign in</p>
                    <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-bungee)" }}>
                        {title}
                    </h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">{detail}</p>
                    <Link
                        href="/?login=true"
                        className="mt-8 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                        Try again
                    </Link>
                </div>
            </div>
        </div>
    );
}
