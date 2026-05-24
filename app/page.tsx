"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import FAQ from "./components/FAQ";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium');

  const handleHumanize = async () => {
    // Check if user is authenticated
    if (!user) {
      setError("Please create an account or log in to use Monkify");
      // Redirect to signup page after a short delay
      setTimeout(() => {
        router.push('/signup');
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
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, intensity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to humanize text');
      }

      setHumanizedText(data.humanizedText);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      setError("Failed to paste from clipboard");
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(humanizedText);
      setCopySuccess(true);
      // Reset success message after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const handleUploadFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError('Only PDF and Word files (.pdf, .doc, .docx) are allowed');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploadingFile(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      setInputText(data.text);
      setCopySuccess(false);
      setHumanizedText("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to upload file';
      setError(message);
    } finally {
      setIsUploadingFile(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <div className="bg-amber-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                Monkify : Where AI Learns to Sound Human
              </h1>
              <p className="text-lg text-gray-600">
                Turn robotic text into natural, clear, and engaging writing. Monkify helps you polish AI output so your essays, assignments, and presentations feel authentic and easy to read.
              </p>
            </div>

            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <textarea
                placeholder="Type, paste, or upload your text files."
                className="w-full h-32 p-4 text-gray-700 border-0 resize-none focus:outline-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 pt-6 pb-4 border-t border-gray-200">
                <button
                  onClick={handlePaste}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Paste text
                </button>
                <button
                  onClick={handleUploadFiles}
                  disabled={true}
                  title="Feature comign soon"
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingFile ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload files
                    </>
                  )}
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload PDF or Word file"
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4">
                {/* Intensity Level Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600 mr-2">Intensity:</span>

                  {/* Light Button */}
                  <button
                    disabled
                    className={`group relative px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 bg-gray-200 text-gray-400 cursor-not-allowed opacity-50`}
                  >
                    <span className="relative z-10">Light</span>
                  </button>

                  {/* Medium Button */}
                  <button
                    disabled
                    className={`group relative px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 bg-gray-200 text-gray-400 cursor-not-allowed opacity-50`}
                  >
                    <span className="relative z-10">Medium</span>
                  </button>

                  {/* Heavy Button */}
                  <button
                    onClick={() => setIntensity('heavy')}
                    className={`group relative px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${intensity === 'heavy'
                      ? 'bg-orange-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                  >
                    <span className="relative z-10">Heavy</span>
                    {intensity === 'heavy' && (
                      <div className="absolute inset-0 bg-orange-400 rounded-lg blur-sm opacity-50 animate-pulse"></div>
                    )}
                  </button>
                </div>

                {/* Monkify Button */}
                <button
                  onClick={handleHumanize}
                  disabled={isLoading || !inputText.trim() || loading}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  title={!user && !loading ? "Please log in or sign up to use Monkify" : ""}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Humanizing...
                    </>
                  ) : (
                    'Monkify →'
                  )}
                </button>
              </div>
            </div>

            {/* Humanized Result */}
            {humanizedText && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-orange-300">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB02E" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-orange-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-bungee)' }}>
                    Humanized Result
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  {humanizedText}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleCopyToClipboard}
                    className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2"
                  >
                    {copySuccess ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setInputText("");
                      setHumanizedText("");
                      setError("");
                      setCopySuccess(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}

            {/* Double-checked with logos - Outside the box */}
            <div className="mt-6 flex flex-col gap-3">
              <span className="text-xs text-gray-600 font-medium">Double-checked with:</span>
              <div className="flex items-center gap-4">
                {/* Originality.ai */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#9333EA" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Originality.ai</span>
                </div>

                {/* Scribbr */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#F97316" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Scribbr</span>
                </div>

                {/* GPTZero */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">GPTZero</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                Turn AI text into
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                natural human writing
              </h2>
              <p className="text-gray-600">Improve your text in seconds</p>
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-[84px] relative">
              {/* AI Written Text */}
              <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200 min-h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-amber-300">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="19" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 0.749607C1.50008 0.90477 1.45204 1.05614 1.36249 1.18285C1.27294 1.30957 1.14629 1.40539 1 1.45711V4.99961L2.08 7.74311L1 10.4996C0.45 10.4996 2.26078e-07 10.0496 2.26078e-07 9.50061V5.99861C0.000355271 5.82341 0.0467299 5.65139 0.13448 5.49976C0.222231 5.34812 0.348278 5.2222 0.5 5.13461V1.45711C0.370381 1.41128 0.255851 1.33071 0.168928 1.22419C0.0820045 1.11767 0.0260315 0.989313 0.0071256 0.853137C-0.0117803 0.71696 0.00710827 0.578207 0.0617273 0.45204C0.116346 0.325873 0.204594 0.217146 0.316827 0.137741C0.42906 0.0583365 0.56096 0.0113087 0.698113 0.00179727C0.835266 -0.00771418 0.972395 0.0206567 1.09451 0.0838095C1.21663 0.146962 1.31904 0.242467 1.39056 0.359887C1.46207 0.477307 1.49993 0.612125 1.5 0.749607ZM14.025 0.774607C14.025 1.11511 13.805 1.40461 13.5 1.50861V5.09961C13.7985 5.27311 14 5.59661 14 5.96461V9.46961C14 10.0196 13.55 10.4696 13 10.4696L11.53 7.62961L13 4.96461V1.50861C12.8652 1.46266 12.7456 1.38044 12.6545 1.27099C12.5633 1.16154 12.5041 1.02908 12.4833 0.888166C12.4625 0.747253 12.481 0.603336 12.5366 0.47222C12.5923 0.341105 12.683 0.227864 12.7988 0.144934C12.9146 0.0620044 13.051 0.0125944 13.1931 0.00213094C13.3351 -0.00833254 13.4773 0.0205552 13.604 0.0856214C13.7307 0.150688 13.8371 0.249415 13.9113 0.370961C13.9856 0.492507 14.0249 0.632168 14.025 0.774607Z" fill="#F8312F" />
                      <path d="M4.5 1.24951C4.5 1.0506 4.57902 0.859836 4.71967 0.719183C4.86032 0.578531 5.05109 0.499513 5.25 0.499513H8.75C8.93037 0.499127 9.10484 0.563756 9.24143 0.681554C9.37802 0.799353 9.46758 0.962431 9.4937 1.1409C9.51982 1.31937 9.48075 1.50127 9.38365 1.65328C9.28654 1.80528 9.13792 1.91719 8.965 1.96851C8.8265 2.00951 8.68 2.02051 8.5415 2.06151L7.015 2.51351L5.455 2.05951C5.319 2.01951 5.175 2.00951 5.039 1.96951C4.8834 1.9239 4.74677 1.82908 4.6496 1.69927C4.55243 1.56947 4.49994 1.41166 4.5 1.24951Z" fill="#FFB02E" />
                      <path d="M10.025 13.9995H3.975C2.33 13.9995 1 12.6695 1 11.0245V5.01451C1 3.34951 2.35 1.99951 4.015 1.99951H9.99C11.65 1.99951 13 3.34951 13 5.01451V11.0295C13 12.6695 11.67 13.9995 10.025 13.9995Z" fill="#CDC4D6" />
                      <path d="M3.6235 8.24951H10.3765C11.5415 8.24951 12.5 7.29001 12.5 6.12451C12.4991 5.56147 12.2751 5.02173 11.8771 4.62346C11.4791 4.22519 10.9395 4.00083 10.3765 3.99951H3.6235C3.06046 4.00083 2.52088 4.22519 2.12289 4.62346C1.7249 5.02173 1.50092 5.56147 1.5 6.12451C1.50092 6.68755 1.7249 7.22729 2.12289 7.62556C2.52088 8.02383 3.06046 8.24819 3.6235 8.24951ZM5.736 11.9995H8.264C8.67 11.9995 9 11.6625 9 11.2495C9 10.8365 8.67 10.4995 8.264 10.4995H5.736C5.33 10.4995 5 10.8365 5 11.2495C5 11.6625 5.33 11.9995 5.736 11.9995Z" fill="#212121" />
                      <path d="M4.125 4.99951C3.78 4.99951 3.5 5.27951 3.5 5.62451V6.87451C3.5 7.04027 3.56585 7.19924 3.68306 7.31645C3.80027 7.43366 3.95924 7.49951 4.125 7.49951C4.29076 7.49951 4.44973 7.43366 4.56694 7.31645C4.68415 7.19924 4.75 7.04027 4.75 6.87451V5.62451C4.75 5.27951 4.47 4.99951 4.125 4.99951ZM9.875 4.99951C9.53 4.99951 9.25 5.27951 9.25 5.62451V6.87451C9.25 7.04027 9.31585 7.19924 9.43306 7.31645C9.55027 7.43366 9.70924 7.49951 9.875 7.49951C10.0408 7.49951 10.1997 7.43366 10.3169 7.31645C10.4342 7.19924 10.5 7.04027 10.5 6.87451V5.62451C10.5 5.27951 10.22 4.99951 9.875 4.99951Z" fill="#00A6ED" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-bungee)' }}>
                    AI-written text
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm flex-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Training at the gym has many benefits for <mark className="bg-amber-200 px-1">both physical and mental health.</mark> One similarity <mark className="bg-amber-200 px-1">across many sources</mark> is that <mark className="bg-amber-200 px-1">exercise improves strength and endurance.</mark> Another common idea claims that physical activity <mark className="bg-amber-200 px-1">reduces stress and improves mood,</mark> especially after regular workouts. A third point <mark className="bg-amber-200 px-1">often mentioned</mark> is that <mark className="bg-amber-200 px-1">consistent exercise helps build long-term habits,</mark> which makes it easier to stay active.
                </p>
              </div>

              {/* Arrow Separator */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.00033 10H15.417M15.417 10L10.417 5M15.417 10L10.417 15" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Humanized Text */}
              <div className="bg-orange-50 rounded-3xl p-6 border-2 border-orange-200 min-h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-orange-300">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB02E" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-bold text-orange-700 uppercase tracking-wider" style={{ fontFamily: 'var(--font-bungee)' }}>
                    Humanized text
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm flex-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Training at the gym comes with many benefits for physical and <mark className="bg-orange-200 px-1">mental well-being.</mark> A few common points show up in several sources. <mark className="bg-orange-200 px-1">One of them says that</mark> regular exercise increases strength and endurance. Another idea suggests that physical activity lowers stress and improves your mood. Plus, regular training can help people build lasting habits. All in all, that <mark className="bg-orange-200 px-1">makes staying active much easier over time.</mark>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Detection Demo Section */}
        <div className="bg-amber-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                See exactly what needs
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>
                improvement—and fix it fast
              </h2>
            </div>

            {/* Demo Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Analysis Report */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Analysis Report</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  <mark className="bg-red-100 px-1">Most experts agree that adults usually need about 7 hours of sleep during the day. Studies suggest that sleep helps our brain work better and improves memory and thinking.</mark> <mark className="bg-green-100 px-1">At the same time, people who don't get enough sleep are</mark> <mark className="bg-red-100 px-1">more likely to experience problems such as poor concentration and mood issues.</mark> <mark className="bg-yellow-100 px-1">On the other hand, sleeping too much can sometimes be harmful, so finding the right balance is important.</mark> <mark className="bg-red-100 px-1">Overall, sleep is ideal for most people to stay productive and healthy.</mark>
                </p>
              </div>

              {/* Right: AI Detection Results */}
              <div className="flex flex-col gap-4">
                {/* Detection Score Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-4">
                    {/* Circular Progress */}
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                        <circle cx="40" cy="40" r="32" stroke="#ef4444" strokeWidth="8" fill="none" strokeDasharray="201" strokeDashoffset="47" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">73%</span>
                      </div>
                    </div>

                    {/* Detection Info */}
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">AI Detection Results</span>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Likely AI-generated</h3>
                      <p className="text-xs text-gray-600">A significant part of the text looks AI-generated.</p>
                    </div>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                  {/* Pure AI text */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pure AI text</p>
                        <p className="text-xs text-gray-500">Text that closely matches typical AI writing patterns</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: '73%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-10 text-right">73%</span>
                    </div>
                  </div>

                  {/* Human-written */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Human-written</p>
                        <p className="text-xs text-gray-500">Text written by a person</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '6%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-10 text-right">6%</span>
                    </div>
                  </div>

                  {/* AI with edits */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">AI with edits</p>
                        <p className="text-xs text-gray-500">AI text with small human edits</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '21%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-10 text-right">21%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-bungee)' }}>
                See why students choose
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>
                Monkify
              </h2>
            </div>

            <TestimonialsMarquee />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-amber-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'var(--font-fredoka)' }}>Features</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>
                <span className="text-orange-600">All-in-one</span> writing toolkit
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Humanizer */}
              <div className="bg-white rounded-3xl p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                  AI Humanizer
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Rewrite AI text to sound natural and human—without changing your meaning.
                </p>
              </div>

              {/* AI Detector */}
              <div className="bg-white rounded-3xl p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                  AI Detector
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Check how much of your text may appear AI-generated.
                </p>
              </div>

              {/* Plagiarism Checker */}
              <div className="bg-white rounded-3xl p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                  Plagiarism Checker
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Scan your work for similarities and avoid duplicate content.
                </p>
              </div>

              {/* AI Chat */}
              <div className="bg-white rounded-3xl p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-bungee)' }}>
                  AI Chat
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Ask questions, improve drafts, and refine ideas with AI assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 -ml-40">
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-bungee)' }}>
                    Monkify
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-6" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Copyright © 2026 Monkify. All rights reserved
                </p>
              </div>

              {/* AI Tools */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                  AI Tools
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      AI Detector
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      AI Humanizer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      Grammar Checker
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      Plagiarism Checker
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help Center */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                  Help Center
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      Subscription Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors" style={{ fontFamily: 'var(--font-fredoka)' }}>
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>

              {/* Language Selector */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-bungee)' }}>
                  Language
                </h4>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-orange-600 transition-colors">
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-fredoka)' }}>English</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          window.location.href = '/signup';
        }}
        onForgotPassword={() => {
          setIsLoginOpen(false);
          setIsForgotPasswordOpen(true);
        }}
      />

      {/* Forgot Password Modal */}
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
