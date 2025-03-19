export interface Message {
    id: number;
    sender: 'User' | 'Bot';
    text: string;
    created_at: string;
}

export interface Chat {
    id: number;
    title: string;
    messages: Message[];
    created_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ChatbotProps {
    messages: {
        data: Message[];
    };
    auth: {
        user: User;
    };
    chats: Chat[];
}
