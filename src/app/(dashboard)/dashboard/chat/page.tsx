'use client';

import { useState, useRef, useEffect, useMemo, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send, Mic, Paperclip, Bot,
  MessageSquare, Loader2, AlertCircle,
  Home, Copy, RefreshCcw, Trash2, Check, FileText, Image as ImageIcon, X,
  Activity, Pill, MapPin, FileUp, BookOpen, 
  Plus, Search, History, Settings
} from 'lucide-react';
import { getFriendlyChatError } from '@/lib/ai-errors';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const quickPrompts = [
  { text: "Analisis Gejala", prompt: "Tolong analisis gejala berikut ini: " },
  { text: "Interaksi Obat", prompt: "Apakah ada interaksi antara obat " },
  { text: "Cari Fasilitas Medis", prompt: "Tolong carikan fasilitas kesehatan terdekat untuk penanganan " },
  { text: "Upload Resep", prompt: "Berikut lampiran resep medis. Tolong jelaskan indikasinya." },
  { text: "Edukasi Kesehatan", prompt: "Berikan edukasi kesehatan singkat mengenai " }
];

type ChatSession = { id: string; title: string; updatedAt: string };
type UploadedFile = { name: string; type: string; url?: string };

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export default function ChatPage() {
  const router = useRouter();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), []);

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
    clearError,
    reload,
  } = useChat({
    id: currentSessionId ?? 'pending-session',
    transport,
    onError: (err) => {
      console.error('[CHAT_CLIENT_ERROR]', err.message);
      setServiceError(getFriendlyChatError(err));
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const loadSessionMessages = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/chat/session/${sessionId}/messages`);
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      if (data.success) setMessages(data.data as UIMessage[]);
      else setMessages([]);
    } catch (error) {
      console.error('Gagal load pesan sesi:', error);
      setMessages([]);
    }
  }, [setMessages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== 'ready' || (!input.trim() && attachments.length === 0) || !currentSessionId) return;

    setServiceError(null);
    clearError();
    sendMessage(
      { text: input.trim() },
      { body: { sessionId: currentSessionId, attachments: attachments } }
    );
    setInput('');
    setAttachments([]);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachments([...attachments, { name: file.name, type: file.type }]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (error) setServiceError(getFriendlyChatError(error));
  }, [error]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await fetch('/api/chat/session');
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setSessions(data.data);
          setCurrentSessionId(data.data[0].id);
        } else {
          createNewSession();
        }
      } catch (error) {
        console.error('Gagal load history:', error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (currentSessionId) loadSessionMessages(currentSessionId);
  }, [currentSessionId, loadSessionMessages]);

  const createNewSession = async () => {
    try {
      const res = await fetch('/api/chat/session', { method: 'POST' });
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setSessions(prev => [data.data, ...prev]);
        setCurrentSessionId(data.data.id);
        setMessages([]);
        setIsHistoryOpen(false);
      }
    } catch (error) {
      console.error('Gagal buat sesi baru:', error);
    }
  };

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(sessions.filter(s => s.id !== id));
    if (currentSessionId === id) {
      setMessages([]);
      const nextSession = sessions.find(s => s.id !== id);
      if (nextSession) setCurrentSessionId(nextSession.id);
      else createNewSession();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isLoading, attachments]);

  const toggleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Maaf, browser Anda tidak mendukung fitur suara. Gunakan Google Chrome.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    recognition.start();
  };

  // --- TRIK NINJA: Sembunyikan sidebar dashboard saat masuk halaman AI ---
  useEffect(() => {
    const globalSidebars = document.querySelectorAll('aside, nav, [class*="sidebar" i]');
    globalSidebars.forEach((el) => {
      (el as HTMLElement).style.setProperty('display', 'none', 'important');
    });

    return () => {
      globalSidebars.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });
    };
  }, []);
  // ----------------------------------------------------------------------

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full font-sans antialiased text-slate-800 bg-[#FFFFFF]">
      
      {/* 1. SIDEBAR KIRI 68px DENGAN OUTLINE YANG LEBIH TEGAS */}
      <div className="w-[68px] shrink-0 bg-[#F8FAFC] border-r border-slate-200 flex flex-col items-center py-4 justify-between z-20 shadow-[2px_0_15px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Logo EIOHealth - Sekarang murni pajangan (bukan tag button) */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          
          <div className="w-6 h-[1px] bg-slate-200 my-1"></div>
          
          {/* Menu Icons */}
          <button onClick={createNewSession} className="w-10 h-10 rounded-xl hover:bg-slate-200/60 flex items-center justify-center text-slate-500 transition-colors" title="New Chat">
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl hover:bg-slate-200/60 flex items-center justify-center text-slate-500 transition-colors" title="Search">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)} 
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isHistoryOpen ? 'bg-slate-200 text-slate-800 shadow-sm' : 'hover:bg-slate-200/60 text-slate-500'}`} 
            title="History"
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {/* Tombol Pengaturan - Redirect ke halaman Settings */}
          <button onClick={() => router.push('/dashboard/settings')} className="w-10 h-10 rounded-xl hover:bg-slate-200/60 flex items-center justify-center text-slate-500 transition-colors" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          {/* Avatar User */}
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer shadow-sm" title="Kamal Ilham | Pharmacist">
            <span className="text-[11px] font-bold">KI</span>
          </div>
        </div>
      </div>

      {/* 2. DRAWER HISTORY (SLIDING DARI SAMPING SIDEBAR) */}
      <AnimatePresence>
        {isHistoryOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#F9FAFB] border-r border-slate-100 flex flex-col shrink-0 z-10 overflow-hidden"
          >
            <div className="w-[280px] h-full flex flex-col">
              <div className="px-4 py-5 font-semibold text-sm text-slate-700 flex justify-between items-center">
                Riwayat Chat
                <button onClick={() => setIsHistoryOpen(false)} className="p-1 hover:bg-slate-200 rounded-md text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-thin">
                {sessions.map((session) => (
                  <div 
                    key={session.id}
                    onClick={() => setCurrentSessionId(session.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all group text-[13px] ${
                      currentSessionId === session.id ? 'bg-white shadow-sm border border-slate-100 font-medium text-slate-800' : 'hover:bg-slate-200/50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{session.title}</span>
                    </div>
                    <button 
                      onClick={(e) => deleteSession(e, session.id)} 
                      className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN AREA (OBROLAN) */}
      <div 
        className="flex-1 flex flex-col h-screen overflow-hidden relative"
        style={{ background: 'linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)' }}
      >
        {/* HEADER MINIMALIS DENGAN TOMBOL DASHBOARD KANAN ATAS */}
        <header className="absolute top-0 w-full p-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="text-[14px] font-semibold text-slate-700 pointer-events-auto bg-white/60 px-4 py-2 rounded-full backdrop-blur-md border border-slate-200/60 shadow-sm">
            EIO Health AI
          </div>
          
          {/* Tombol Kembali ke Dashboard */}
          <button 
            onClick={() => router.push('/dashboard')}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-full shadow-sm transition-all duration-200 text-[13px] font-semibold"
            title="Kembali ke Dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </header>

        {/* AREA CHAT (Lebar Max 800px) */}
        <main className="flex-1 overflow-y-auto w-full pt-20 pb-40 px-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          
          {/* EMPTY STATE */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center max-w-[800px] mx-auto w-full">
              <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">EIOHealth AI Assistant</h1>
              <p className="text-slate-500 text-[15px] mb-12">Konsultasi kesehatan cerdas berbasis AI</p>
              
              {/* Prompt Suggestions Chips */}
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {quickPrompts.map((btn, idx) => (
                  <button
                    key={idx} onClick={() => setInput(btn.prompt)}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600 transition-all text-[13px] shadow-sm font-medium"
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE CHAT */}
          <div className="w-full max-w-[800px] mx-auto flex flex-col pt-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const msgText = getMessageText(msg);
                
                return (
                  <motion.div
                    key={msg.id || idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-full mb-8"
                  >
                    {isUser ? (
                      /* USER BUBBLE (Kanan) */
                      <div className="ml-auto px-5 py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white rounded-[24px] max-w-[85%] shadow-sm">
                        <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msgText}</div>
                      </div>
                    ) : (
                      /* AI BUBBLE (Kiri) */
                      <div className="mr-auto px-6 py-4 bg-white border border-[rgba(0,0,0,0.08)] text-slate-800 rounded-[24px] max-w-[95%] shadow-sm flex flex-col">
                        <div className="prose prose-slate prose-sm md:prose-base prose-headings:font-semibold prose-a:text-indigo-600 prose-p:leading-relaxed max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msgText}
                          </ReactMarkdown>
                        </div>
                        {/* Tools Bawah Chat AI */}
                        <div className="flex items-center gap-1 mt-3 text-slate-400">
                          <button onClick={() => handleCopy(msgText, msg.id)} className="p-1.5 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors" title="Copy">
                            {copiedId === msg.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          {idx === messages.length - 1 && (
                            <button onClick={() => reload()} className="p-1.5 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors" title="Regenerate">
                              <RefreshCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* TYPING INDICATOR */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full mb-8">
                <div className="mr-auto px-6 py-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-[24px] shadow-sm flex items-center gap-1.5 h-[50px]">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </main>

        {/* 4. CHAT INPUT (Gaya ChatGPT) */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/95 to-transparent pt-6 pb-8 px-4 pointer-events-none">
          <div className="max-w-[800px] mx-auto w-full pointer-events-auto">
            
            {serviceError && (
              <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700 shadow-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <p className="flex-1 font-medium">{serviceError}</p>
              </div>
            )}

            {/* File Preview */}
            {attachments.length > 0 && (
              <div className="flex gap-2 mb-2 overflow-x-auto pb-1 pl-4">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm shrink-0">
                    {file.type.includes('image') ? <ImageIcon className="w-3.5 h-3.5 text-[#06B6D4]" /> : <FileText className="w-3.5 h-3.5 text-[#4F46E5]" />}
                    <span className="text-[12px] font-medium text-slate-600 max-w-[100px] truncate">{file.name}</span>
                    <button type="button" onClick={() => removeAttachment(idx)} className="ml-1 text-slate-400 hover:text-rose-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[32px] px-2 py-1.5 focus-within:border-[rgba(0,0,0,0.2)] transition-all duration-200"
            >
              <div className="relative">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                <label htmlFor="file-upload" className="cursor-pointer p-2.5 m-0.5 flex text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                  <Plus className="w-5 h-5" />
                </label>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if ((input.trim() || attachments.length > 0) && status === 'ready') handleSubmit(e);
                  }
                }}
                placeholder={isListening ? "Mendengarkan..." : "Kirim pesan ke EIOHealth AI..."}
                className="flex-1 bg-transparent border-none py-3 px-1 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none max-h-[150px] min-h-[44px] scrollbar-thin"
                rows={1}
                disabled={isLoading}
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
              />
              
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 m-0.5 shrink-0 rounded-full transition-all duration-200 ${
                  isListening
                    ? 'bg-rose-100 text-rose-600 animate-pulse'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              <button
                type="submit"
                disabled={isLoading || (!input.trim() && attachments.length === 0)}
                className="p-2.5 m-0.5 rounded-full bg-black text-white disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed hover:opacity-80 transition-opacity duration-200 shrink-0 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-[11px] text-slate-400">
                EIOHealth AI dapat membuat kesalahan. Periksa informasi klinis yang penting.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}