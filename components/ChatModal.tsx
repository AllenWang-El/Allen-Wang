import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ItineraryItem } from '../types';
import { sendChatMessage } from '../services/geminiService';

// Add the marked type definition globally to avoid TS errors
declare const marked: {
  parse: (text: string) => string;
};

interface ChatModalProps {
    onClose: () => void;
    itinerary: ItineraryItem[];
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose, itinerary }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: '你好！我是你的河內旅遊專屬助理。想知道更多關於下龍灣的資訊，或是想找附近好吃的河粉嗎？隨時問我！' }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        const response = await sendChatMessage(userMsg, itinerary);
        
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setLoading(false);
    };

    return (
        <div className="absolute inset-0 z-[70] flex flex-col bg-white animate-slide-up">
            <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-robot text-lg"></i>
                    </div>
                    <div>
                        <h3 className="font-bold">河內旅遊小幫手</h3>
                        <p className="text-xs text-teal-100">Powered by Gemini ✨</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white"><i className="fas fa-chevron-down text-xl"></i></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                <div className="flex flex-col items-center justify-center text-slate-400 py-4 text-xs space-y-1">
                    <p>我可以回答關於您行程的問題，</p>
                    <p>或是推薦河內的美食與景點喔！</p>
                </div>

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                            {msg.role === 'model' 
                                ? <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                                : <div>{msg.text}</div>
                            }
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-slate-500 rounded-2xl rounded-bl-none p-3 text-sm shadow-sm border border-slate-100 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    type="text" 
                    placeholder="問問關於河內的事..." 
                    className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input || loading} 
                    className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-teal-600 transition-colors"
                >
                    <i className="fas fa-paper-plane text-sm"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatModal;