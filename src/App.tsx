/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ScriptForm from './components/ScriptForm';
import ScriptDisplay from './components/ScriptDisplay';
import { generateScript, ScriptData, SlideContent } from './services/gemini';
import { Moon, Star } from 'lucide-react';

export default function App() {
  const [slides, setSlides] = useState<SlideContent[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: ScriptData) => {
    setIsLoading(true);
    setError(null);
    setSlides(null);
    try {
      const result = await generateScript(data);
      setSlides(result);
    } catch (err) {
      setError('Có lỗi xảy ra khi thỉnh kịch bản. Thử lại giùm mình nha!');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0a0a] bg-[radial-gradient(ellipse_at_top,_#5c2e00_0%,_#1a0a0a_100%)] text-amber-50 overflow-x-hidden font-serif selection:bg-amber-500/30 selection:text-white">
      {/* Mystical Fog/Smoke Effect */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center min-h-screen">
        <header className="text-center mb-20 space-y-6 relative">
          {/* Glowing Halo behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative inline-flex items-center justify-center p-5 bg-black/60 rounded-full border border-amber-700/50 mb-6 shadow-[0_0_60px_rgba(220,38,38,0.3)] ring-1 ring-amber-500/20">
            <Moon className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-600 to-amber-900 tracking-tighter drop-shadow-2xl uppercase font-[Cinzel,serif]">
            Thiên Cơ Lộ
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-red-300/60 text-sm md:text-base tracking-[0.3em] font-light">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-900"></span>
            <span>VẠN SỰ TẠI THIÊN</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-900"></span>
          </div>
        </header>

        <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
          {!slides && (
            <div className="w-full flex justify-center mb-12">
              <ScriptForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <div className="text-center py-24 relative">
              <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto mb-10">
                <div className="absolute inset-0 border-t-2 border-red-600/80 rounded-full animate-spin duration-[3s]"></div>
                <div className="absolute inset-4 border-r-2 border-amber-500/60 rounded-full animate-spin duration-[2s] reverse"></div>
                <div className="absolute inset-8 border-b-2 border-yellow-400/40 rounded-full animate-spin duration-[1s]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping"></div>
                </div>
              </div>
              <p className="text-3xl text-amber-500 font-bold uppercase tracking-[0.2em] animate-pulse font-[Cinzel,serif]">Đang Luận Giải</p>
              <p className="text-sm text-red-400/40 mt-4 italic tracking-widest">Thiên linh linh • Địa linh linh</p>
            </div>
          )}

          {error && (
            <div className="w-full max-w-md bg-red-950/80 border-l-4 border-red-600 text-red-100 px-8 py-6 shadow-[0_0_30px_rgba(220,38,38,0.2)] mb-10">
              <p className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">⚠</span> Thiên Cơ Bất Khả Lộ
              </p>
              <p className="opacity-80 text-sm">{error}</p>
            </div>
          )}

          {slides && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="flex justify-center mb-16">
                <button 
                  onClick={() => setSlides(null)}
                  className="group relative px-8 py-3 bg-black/40 border border-amber-800/50 hover:border-amber-500/80 transition-all uppercase text-xs tracking-[0.3em] text-amber-600 hover:text-amber-300 overflow-hidden"
                >
                  <span className="relative z-10">← Luận Quẻ Khác</span>
                  <div className="absolute inset-0 bg-amber-900/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </button>
              </div>
              <ScriptDisplay slides={slides} />
            </div>
          )}
        </main>

        <footer className="mt-32 text-center text-red-900/30 text-[10px] uppercase tracking-[0.4em] pb-8 border-t border-red-900/10 w-full pt-8">
          <p>Thiên Cơ Lộ • 2024 • Bản Quyền Thuộc Về Vận Mệnh</p>
        </footer>
      </div>
    </div>
  );
}

