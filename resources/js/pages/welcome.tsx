import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Wee Chat - AI Chatbot">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                {/* Navigation */}
                <header className="w-full px-6 py-4 md:px-12">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Wee Chat</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('chat')}
                                    className="rounded-md bg-indigo-600 px-5 py-2 text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-gray-300 px-5 py-2 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-5 py-2 text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="flex flex-col items-center justify-between px-6 py-12 md:px-12 lg:flex-row lg:px-24">
                    <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
                        <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                            Chat Smarter with <span className="text-indigo-600 dark:text-indigo-400">Wee Chat</span>
                        </h1>
                        <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
                            Experience the power of AI-driven conversations. Wee Chat is your intelligent companion for productivity, learning, and
                            entertainment.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('chat')}
                                    className="rounded-md bg-indigo-600 px-8 py-3 text-center text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    Start Chatting
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-indigo-600 px-8 py-3 text-center text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-gray-300 px-8 py-3 text-center transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full justify-center lg:w-1/2">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 rounded-lg bg-indigo-600 opacity-50 blur-xl dark:opacity-30"></div>
                            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                <div className="flex items-center border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                    <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="ml-2 text-sm font-medium">Wee Chat</div>
                                </div>
                                <div className="h-80 overflow-y-auto p-6">
                                    <div className="mb-4 flex">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300">
                                            W
                                        </div>
                                        <div className="ml-3 max-w-xs rounded-lg bg-indigo-100 px-4 py-2 dark:bg-indigo-900">
                                            <p className="text-sm">Hello! How can I help you today?</p>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex justify-end">
                                        <div className="mr-3 max-w-xs rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                                            <p className="text-sm">Can you tell me about Wee Chat?</p>
                                        </div>
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                                            U
                                        </div>
                                    </div>
                                    <div className="mb-4 flex">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300">
                                            W
                                        </div>
                                        <div className="ml-3 max-w-xs rounded-lg bg-indigo-100 px-4 py-2 dark:bg-indigo-900">
                                            <p className="text-sm">
                                                Wee Chat is an intelligent AI chatbot designed to provide helpful responses, assist with tasks, and
                                                engage in natural conversations. I'm here to make your digital experience more productive and
                                                enjoyable!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            disabled
                                        />
                                        <button
                                            className="ml-2 rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                            disabled
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 px-6 py-16 md:px-12 lg:px-24 dark:bg-gray-800">
                    <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Wee Chat?</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-300">Get instant responses to your questions without waiting.</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
                            <p className="text-gray-600 dark:text-gray-300">Your conversations are encrypted and your data stays private.</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Natural Conversations</h3>
                            <p className="text-gray-600 dark:text-gray-300">Chat with an AI that understands context and responds naturally.</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Customizable</h3>
                            <p className="text-gray-600 dark:text-gray-300">Tailor the chat experience to your preferences and needs.</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">24/7 Availability</h3>
                            <p className="text-gray-600 dark:text-gray-300">Get help whenever you need it, day or night.</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Knowledge Base</h3>
                            <p className="text-gray-600 dark:text-gray-300">Access a vast knowledge base to answer your questions.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 px-6 py-16 text-white md:px-12 lg:px-24 dark:bg-indigo-800">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 text-3xl font-bold">Ready to start chatting?</h2>
                        <p className="mb-8 text-xl text-indigo-100">Join thousands of users who are already experiencing the power of Wee Chat.</p>
                        {auth.user ? (
                            <Link
                                href={route('chat')}
                                className="inline-block rounded-md bg-white px-8 py-3 font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="inline-block rounded-md bg-white px-8 py-3 font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                            >
                                Sign Up for Free
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-100 px-6 py-8 md:px-12 dark:bg-gray-900">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 md:mb-0">
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Wee Chat</span>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} Wee Chat. All rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                Terms
                            </a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                                Contact
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
