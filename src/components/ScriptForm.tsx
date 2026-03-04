import React, { useState } from 'react';
import { ScriptData } from '../services/gemini';
import { Sparkles, Loader2 } from 'lucide-react';

interface ScriptFormProps {
  onSubmit: (data: ScriptData) => void;
  isLoading: boolean;
}

export default function ScriptForm({ onSubmit, isLoading }: ScriptFormProps) {
  const [zodiac, setZodiac] = useState('');
  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zodiac && topic && time) {
      onSubmit({ zodiac, topic, time });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-8 bg-black/40 backdrop-blur-md p-10 border border-amber-900/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-600/50"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-600/50"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-600/50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-600/50"></div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-amber-500 uppercase tracking-widest">
          Nhập Thông Tin
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-4"></div>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label className="block text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 group-focus-within:text-amber-500 transition-colors">Bản Mệnh / Con Giáp</label>
          <input
            type="text"
            value={zodiac}
            onChange={(e) => setZodiac(e.target.value)}
            placeholder="Ví dụ: Giáp Thìn, Quý Mão..."
            className="w-full px-4 py-3 bg-black/60 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 placeholder-amber-900/30 outline-none transition-all font-serif text-lg"
            required
          />
        </div>

        <div className="group">
          <label className="block text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 group-focus-within:text-amber-500 transition-colors">Sự Việc Cần Xem</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ví dụ: Hạn tam tai, Mất của..."
            className="w-full px-4 py-3 bg-black/60 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 placeholder-amber-900/30 outline-none transition-all font-serif text-lg"
            required
          />
        </div>

        <div className="group">
          <label className="block text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 group-focus-within:text-amber-500 transition-colors">Thời Điểm</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Ví dụ: Tháng 7 âm lịch..."
            className="w-full px-4 py-3 bg-black/60 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 placeholder-amber-900/30 outline-none transition-all font-serif text-lg"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-amber-100 font-bold uppercase tracking-[0.2em] shadow-lg shadow-red-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-red-700/30"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
            Đang Luận Giải...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-500" />
            Khai Mở Thiên Cơ
          </>
        )}
      </button>
    </form>
  );
}
