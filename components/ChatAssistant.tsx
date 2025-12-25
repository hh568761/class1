
import React, { useState, useRef, useEffect } from 'react';
import { askAiAboutCode } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  currentCode: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ currentCode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '嗨！我是黄老师的 AI 助教。由于我身在远方的服务器里，如果我没有回复，可能是跨海光缆信号不太好（网络环境问题），记得检查你的加速器哦！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const aiResponse = await askAiAboutCode(currentCode, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (e) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🚨 [传输中断]: 无法连接到 AI 脑核。这通常是因为本地网络环境限制，请尝试切换网络加速模式后刷新页面。' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 border-l border-slate-800">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          AI 编程老师
        </h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-900/20' 
                : 'bg-slate-800 text-slate-300 rounded-bl-none border border-slate-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 text-slate-400 text-xs italic flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </span>
              正在思考...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问助教..."
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 px-5 pr-12 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
