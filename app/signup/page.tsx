"use client";

import Link from "next/link";
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // Validate terms acceptance
        if (!termsAccepted) {
            setError('Please accept the Terms of Service and Privacy Policy');
            setLoading(false);
            return;
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const supabase = createClient();

            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            console.log('Signup response:', { data, error: signUpError });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            if (data.user) {
                // Check if email confirmation is required
                if (data.user.identities && data.user.identities.length === 0) {
                    setError('This email is already registered. Please login instead.');
                    setLoading(false);
                    return;
                }

                // Check if user needs to confirm email
                const needsEmailConfirmation = data.user.confirmed_at === null;

                console.log('User created:', {
                    email: data.user.email,
                    needsEmailConfirmation,
                    confirmed_at: data.user.confirmed_at
                });

                if (needsEmailConfirmation) {
                    setMessage('Account created! Please check your email to verify your account before logging in.');
                    // Clear form
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setTermsAccepted(false);

                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        window.location.href = '/?login=true';
                    }, 3000);
                } else {
                    // User is automatically logged in, redirect to homepage immediately
                    console.log('Redirecting to homepage...');

                    // Clear form
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setTermsAccepted(false);

                    // Redirect immediately
                    window.location.href = '/';
                }
            } else {
                setError('Failed to create account. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Google sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignUp = async () => {
        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('GitHub sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <Link href="/" className="inline-flex items-center mb-8">
                    <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>Monkify</span>
                </Link>

                <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 items-start">
                    <div className="hidden lg:block pt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4">Get started</p>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-bungee)' }}>
                            Humanize your first draft today
                        </h1>
                        <ul className="mt-8 space-y-4 text-gray-700">
                            <li className="flex gap-3"><span className="text-indigo-1000">●</span> Paste an AI draft and rewrite the voice</li>
                            <li className="flex gap-3"><span className="text-indigo-1000">●</span> Keep the meaning while the rhythm changes</li>
                            <li className="flex gap-3"><span className="text-indigo-1000">●</span> See which lines still sound mechanical</li>
                        </ul>
                    </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 animate-slideUp">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight lg:hidden" style={{ fontFamily: 'var(--font-bungee)' }}>
                            Join Monkify
                        </h1>
                        <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-bungee)' }}>
                            Create your account
                        </h2>
                        <p className="text-gray-600">Sign up to humanize a draft.</p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                            {message}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleEmailSignUp} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 font-medium"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 font-medium"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 font-medium"
                                style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 font-medium"
                                style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                disabled={loading}
                                className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:cursor-not-allowed"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Terms of Service
                                </a>
                                {' '}and{' '}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            disabled={loading}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubSignUp}
                            disabled={loading}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link
                            href="/?login=true"
                            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
}
