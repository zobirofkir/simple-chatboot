import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ChatbotProps, Message } from '../types/chat';

export default function Chatbot({ messages, auth, chats }: ChatbotProps) {
    const [message, setMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentChat, setCurrentChat] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Sidebar */}
            <div
                className={`fixed z-40 h-screen transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 border-r p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex flex-col shadow-2xl`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Chats</h2>
                </div>

                <div className="flex-1 space-y-2">
                    {chats?.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => switchChat(chat.id)}
                            className={`w-full transform rounded-xl p-2 text-left transition-all duration-200 hover:scale-105 ${
                                currentChat === chat.id ? 'bg-blue-500 text-white shadow-lg' : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            } shadow-md hover:shadow-xl`}
                            style={{
                                transform: currentChat === chat.id ? 'translateY(-2px)' : 'none',
                            }}
                        >
                            {chat.title || `Chat ${chat.id}`}
                        </button>
                    ))}
                </div>

                {/* Sidebar buttons at bottom */}
                <div className="mt-4 space-y-2">
                    <button
                        onClick={() => router.get('/settings')}
                        className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gray-600 px-4 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
                        style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-red-600 hover:shadow-xl"
                        style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className={`border-b p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-md`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`rounded-lg p-2 transition-transform duration-200 hover:scale-110 md:hidden ${
                                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-bold">Welcome, {auth.user.name}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`rounded-full p-2 transition-transform duration-200 hover:scale-110 ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                } shadow-md`}
                            >
                                {isDarkMode ? '🌞' : '🌙'}
                            </button>
                        </div>
                    </div>
                </div>

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
