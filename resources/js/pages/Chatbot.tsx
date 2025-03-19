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

    const createNewChat = () => {
        router.post('/chats/create');
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
                } w-64 border-r p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Chats</h2>
                    <button onClick={createNewChat} className="hover:bg-opacity-80 rounded-full bg-blue-500 p-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-2">
                    {chats?.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => switchChat(chat.id)}
                            className={`w-full rounded p-2 text-left ${
                                currentChat === chat.id ? 'bg-blue-500 text-white' : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                        >
                            {chat.title || `Chat ${chat.id}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className={`border-b p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`rounded-lg p-2 md:hidden ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-bold">Welcome, {auth.user.name}</h2>
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                        >
                            {isDarkMode ? '🌞' : '🌙'}
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className={`flex-1 overflow-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    {messages.data.map((msg: Message, index: number) => (
                        <div key={msg.id || index} className={`mb-4 max-w-3xl ${msg.sender === 'Bot' ? 'ml-4' : 'mr-4 ml-auto'}`}>
                            <div
                                className={`rounded-lg p-3 ${
                                    msg.sender === 'Bot' ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : 'bg-blue-500 text-white'
                                }`}
                            >
                                <div className="mb-1 font-bold">{msg.sender}</div>
                                <div>{msg.text}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className={`border-t p-4 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <div className="mx-auto flex max-w-4xl gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className={`flex-1 rounded-lg border p-2 ${
                                isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                            }`}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage} className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
