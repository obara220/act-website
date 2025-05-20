import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import ChatHeaderContainer from './ChatHeaderContainer';
import { FaSearch, FaSignOutAlt, FaArrowLeft, FaPaperPlane } from "react-icons/fa"; // Import the search icon
import "./index.css";
// import "./globals.css"

const RealtimeChat = ({ roomName = 'public', username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch initial messages
    const fetchMessages = useCallback(async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('room', roomName)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data);
        }
    }, [roomName]);

    // Send a message
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const { error } = await supabase.from('messages').insert([
            {
                content: newMessage,
                username,
                room: roomName,
            },
        ]);

        if (error) console.error('Send error:', error);
        else setNewMessage('');
    };

    // Realtime subscription
    useEffect(() => {
        fetchMessages();

        const subscription = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `room=eq.${roomName}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [roomName, fetchMessages]);

    return (
        <div className="p-6 w-full pr-6 pl-6">

            <ChatHeaderContainer />
            <div className="chat-wrapper">
                <div className="chat-box">
                    <div className="chat-header">
                        Chat Room: <span>{roomName}</span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg) => {
                            const initials = msg.username
                                .split(/[\s_]+/)
                                .map((n) => n[0]?.toUpperCase())
                                .slice(0, 2)
                                .join('');

                            const isOwn = msg.username === username;

                            return (
                                <div
                                    key={msg.id}
                                    className={`chat-message-row ${isOwn ? 'own' : 'other'}`}
                                >
                                    {isOwn ? (
                                        <>
                                            <div className="chat-text">{msg.content}</div>
                                            <div className="chat-avatar">{initials}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="chat-avatar">{initials}</div>
                                            <div className="chat-text">{msg.content}</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>


                    <form onSubmit={sendMessage} className="chat-form">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="chat-button">

                            <FaPaperPlane />

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RealtimeChat;
