import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ChatbotProps, Message } from '../types/chat';

export default function Chatbot({ messages, auth, chats }: ChatbotProps) {
    const [message, setMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentChat, setCurrentChat] = useState<number | null>(null);
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Check system dark mode preference
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        router.post('/chat', {
            message,
            chat_id: currentChat,
        });
        setMessage('');
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const switchChat = (chatId: number) => {
        router.get(`/chats/${chatId}`);
        setCurrentChat(chatId);
    };

    return (
        <div className={`flex min-h-screen flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Navbar */}
            <nav className={`fixed top-0 z-50 w-full border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-lg`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <button onClick={() => setIsNavMenuOpen(!isNavMenuOpen)} className="rounded-lg p-2 hover:bg-gray-700 md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <span className="ml-2 text-xl font-bold md:ml-0">Welcome, {auth.user.name}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`rounded-full p-2 transition-all duration-200 hover:scale-110 ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                } shadow-md`}
                            >
                                {isDarkMode ? '🌞' : '🌙'}
                            </button>
                            <button
                                onClick={() => router.get('/settings')}
                                className="hidden transform rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-gray-700 md:block"
                            >
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="hidden transform rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-red-600 md:block"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu dropdown */}
                <div
                    className={`${
                        isNavMenuOpen ? 'block' : 'hidden'
                    } border-b md:hidden ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                >
                    <div className="space-y-1 px-4 pt-2 pb-3">
                        <div className="mb-4 space-y-2">
                            {chats?.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => {
                                        switchChat(chat.id);
                                        setIsNavMenuOpen(false);
                                    }}
                                    className={`block w-full rounded-lg px-3 py-2 text-left text-base font-medium ${
                                        currentChat === chat.id
                                            ? 'bg-blue-500 text-white'
                                            : isDarkMode
                                              ? 'text-gray-300 hover:bg-gray-700'
                                              : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {chat.title || `Chat ${chat.id}`}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => router.get('/settings')}
                            className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium hover:bg-gray-700"
                        >
                            Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-red-500 hover:bg-gray-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Chat Area */}
            <div className="mt-16 flex flex-1 flex-col container mx-auto">
                {/* Messages */}
                <div className={`flex-1 overflow-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    {messages.data.map((msg: Message, index: number) => (
                        <div
                            key={msg.id || index}
                            className={`mb-4 max-w-3xl transform transition-all duration-200 hover:scale-102 ${
                                msg.sender === 'Bot' ? 'ml-4' : 'mr-4 ml-auto'
                            }`}
                        >
                            <div
                                className={`rounded-xl p-3 shadow-lg ${
                                    msg.sender === 'Bot' ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : 'bg-blue-500 text-white'
                                }`}
                                style={{
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                }}
                            >
                                <div className="mb-1 font-bold">{msg.sender}</div>
                                <div>{msg.text}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className={`border-t p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-lg`}>
                    <div className="mx-auto flex max-w-4xl gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className={`flex-1 rounded-xl border p-2 shadow-inner transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                                isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                            }`}
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="transform rounded-xl bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
                            style={{
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
