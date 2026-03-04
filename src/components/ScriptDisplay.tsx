import { SlideContent } from '../services/gemini';
import { Copy, Check, Image as ImageIcon, Mic } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ScriptDisplayProps {
  slides: SlideContent[];
}

export default function ScriptDisplay({ slides }: ScriptDisplayProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-16 pb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-amber-500 uppercase tracking-[0.3em] mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-[Cinzel,serif]">
          Thiên Cơ Đã Lộ
        </h2>
        <div className="flex items-center justify-center gap-4 opacity-60">
           <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-600"></div>
           <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
           <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-600"></div>
        </div>
      </div>

      <div className="grid gap-16">
        {slides.map((slide, index) => (
          <SlideCard key={index} slide={slide} index={index} />
        ))}
      </div>
    </div>
  );
}

const SlideCard: React.FC<{ slide: SlideContent; index: number }> = ({ slide, index }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedVoice, setCopiedVoice] = useState(false);

  // Append the suffix to the voiceover as requested
  const voiceoverWithSuffix = `text: ${slide.voiceover} ( thiết kế tiếng việt)`;

  const copyToClipboard = (text: string, type: 'prompt' | 'voice' | 'all') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else if (type === 'voice') {
      setCopiedVoice(true);
      setTimeout(() => setCopiedVoice(false), 2000);
    }
  };

  const fullContent = `PROMPT: ${slide.imagePrompt}\n\n${voiceoverWithSuffix}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glow Effect behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-400/30 to-red-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      <div className="bg-[#1a0505]/90 backdrop-blur-md border border-amber-500/30 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-400/50 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-400/50 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl"></div>

        <div className="bg-gradient-to-r from-amber-950/80 via-[#2a0a0a] to-amber-950/80 px-8 py-4 border-b border-amber-500/30 flex items-center justify-between relative">
          <h3 className="font-serif text-2xl text-amber-400 font-bold tracking-wider relative z-10 drop-shadow-md">
            {slide.title || `Slide ${index + 1}`}
          </h3>
          <div className="relative z-10 flex flex-col items-end">
             <span className="text-[10px] font-bold text-amber-200 uppercase tracking-[0.3em] mb-1">Thiên Cơ</span>
             <span className="text-3xl font-bold text-amber-500/20 font-serif leading-none absolute -right-2 -top-1 select-none">0{index + 1}</span>
          </div>
        </div>

        <div className="p-8 space-y-8 relative">
          {/* Text on Image - THE HERO */}
          <div className="space-y-3 relative z-10 text-center">
            <label className="text-[10px] uppercase tracking-[0.3em] text-amber-500/80 font-bold inline-block mb-2">
              Thông Điệp
            </label>
            <div className="bg-gradient-to-b from-red-950/40 to-black/40 p-6 border border-amber-500/20 text-amber-100 font-serif text-2xl md:text-3xl italic leading-relaxed shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden rounded-lg">
              "{slide.textOnImage}"
            </div>
          </div>

          {/* Combined Prompt & Voiceover for Easy Copying */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
               <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" />
                  Gợi ý & Text
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fullContent);
                    setCopiedPrompt(true); // Reusing state for simplicity or add new state
                    setTimeout(() => setCopiedPrompt(false), 2000);
                  }}
                  className="text-[10px] flex items-center gap-1 text-amber-900 bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded-sm font-bold transition-colors uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedPrompt ? 'Đã chép tất cả' : 'Copy Tất Cả'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               {/* Prompt Column */}
               <div className="space-y-2">
                  <div className="text-[10px] text-amber-700 uppercase font-bold tracking-wider">Prompt Tạo Ảnh</div>
                  <div className="bg-black/40 p-4 border border-amber-900/30 text-gray-300 text-xs font-mono leading-relaxed h-full rounded-md hover:border-amber-500/30 transition-colors">
                    {slide.imagePrompt}
                  </div>
               </div>

               {/* Voiceover Column */}
               <div className="space-y-2">
                  <div className="text-[10px] text-amber-700 uppercase font-bold tracking-wider">Text</div>
                  <div className="bg-black/40 p-4 border border-amber-900/30 text-amber-100/90 text-sm font-serif leading-relaxed h-full rounded-md hover:border-amber-500/30 transition-colors italic">
                    "{voiceoverWithSuffix}"
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
