
import React, { useState, useEffect } from 'react';
import { Slide } from '../types';

interface CoursewareProps {
  lessonId: string;
  slides: Slide[];
}

const Courseware: React.FC<CoursewareProps> = ({ lessonId, slides }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(0);
  }, [lessonId]);

  const slide = slides[currentIdx];

  if (!slide) return null;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
      {/* 顶部总进度条 */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-slate-800 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          style={{ width: `${((currentIdx + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 左侧：文案区 */}
        <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-slate-900/50">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-black rounded-lg border border-blue-500/20 uppercase tracking-widest">
                黄老师主讲
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                第 {currentIdx + 1} / {slides.length} 节
              </span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
            {slide.title}
          </h2>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-medium text-lg">
            {slide.content}
          </div>
        </div>

        {/* 右侧：重点聚焦区 */}
        <div className="flex-1 bg-slate-950/40 p-8 md:p-14 flex items-center justify-center relative">
          {/* 水印背景 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[15vw] font-black italic">C++</span>
          </div>

          <div className="w-full max-w-2xl bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] relative z-10">
            {slide.codeSnippet ? (
              <div className="flex flex-col h-full">
                <div className="px-8 py-4 bg-slate-950/80 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">黄老师划重点 (Code)</span>
                </div>
                <div className="p-8 font-mono text-xl text-blue-300 leading-relaxed whitespace-pre overflow-x-auto selection:bg-blue-500/30">
                  {slide.codeSnippet}
                </div>
              </div>
            ) : (
              <div className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto border border-blue-500/20 text-blue-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold text-2xl">老师温馨提示</h3>
                <p className="text-slate-400 text-base leading-relaxed px-6">
                  仔细观察代码中的逻辑符号。编程不仅仅是指令的组合，更是一种严谨的思维体操。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部导航控制栏 */}
      <div className="h-28 bg-slate-900/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-12">
        <button 
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-10 border border-white/5 active:scale-95"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          上一节
        </button>

        {/* 底部中心小点导航 */}
        <div className="hidden lg:flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-blue-500 w-12' : 'bg-slate-700 w-3 hover:bg-slate-600'}`}
            />
          ))}
        </div>

        <button 
          onClick={() => setCurrentIdx(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentIdx === slides.length - 1}
          className="group flex items-center gap-3 px-10 py-4 rounded-2xl font-black transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] disabled:opacity-10 active:scale-95"
        >
          {currentIdx === slides.length - 1 ? '学完啦！' : '下一节'}
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Courseware;
