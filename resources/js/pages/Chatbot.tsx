import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Chatbot({ messages, auth }) {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message.trim()) return;
        router.post("/chat", { message });
        setMessage("");
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
            <h2 className="text-xl font-bold">Welcome, {auth.user.name}</h2>

            <div className="flex-1 overflow-auto p-4 bg-white rounded">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 border-b">
                        <strong className={msg.sender === "Bot" ? "text-blue-500" : "text-green-500"}>
                            {msg.sender}:
                        </strong>{" "}
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </div>
        </div>
    );
}
