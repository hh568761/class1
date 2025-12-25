
import React, { useState, useEffect } from 'react';
import { getOrderedChapters } from '../constants';
import { Lesson, User } from '../types';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, user, onLogout }) => {
  const chapterGroups = getOrderedChapters();
  const [isApiOnline, setIsApiOnline] = useState<boolean | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(true);

  useEffect(() => {
    // 1. 检查 Key 是否已注入
    if (!process.env.API_KEY) {
      setHasKey(false);
      setIsApiOnline(false);
      return;
    }

    // 2. 检测网络连通性
    const checkApi = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        await fetch('https://generativelanguage.googleapis.com', { mode: 'no-cors', signal: controller.signal });
        setIsApiOnline(true);
        clearTimeout(timeoutId);
      } catch (e) {
        setIsApiOnline(false);
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-screen shrink-0 relative z-40">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm italic shadow-lg shadow-blue-900/40">C++</span>
            极客实验室
          </h1>
          <button onClick={onLogout} title="退出系统" className="text-slate-500 hover:text-rose-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            {user.role === 'teacher' ? '教' : '学'}
          </div>
          <div>
            <p className="text-slate-200 text-xs font-bold">{user.name}</p>
            <p className="text-slate-500 text-[10px]">{user.role === 'teacher' ? '教研专家' : '极客学员'}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {chapterGroups.map((group) => (
          <div key={group.chapter} className="space-y-3">
            <h2 className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] px-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
              {group.chapter}
            </h2>
            <div className="space-y-2">
              {group.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className={`w-full text-left p-3 rounded-xl transition-all group border ${
                    currentLessonId === lesson.id 
                      ? 'bg-blue-600/10 border-blue-500/50 ring-1 ring-blue-500/30' 
                      : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <img src={lesson.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                    <div className="overflow-hidden">
                      <h3 className={`font-bold text-xs truncate ${currentLessonId === lesson.id ? 'text-blue-400' : 'text-slate-300'}`}>
                        {lesson.title}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between px-2">
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">AI 引擎诊断</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              isApiOnline === null ? 'bg-slate-700 animate-pulse' : 
              isApiOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
            }`}></span>
            <span className={`text-[9px] font-black uppercase ${
              isApiOnline === null ? 'text-slate-600' :
              isApiOnline ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              {isApiOnline === null ? '侦听中' : isApiOnline ? '就绪' : '异常'}
            </span>
          </div>
        </div>
        
        {!hasKey ? (
          <div className="mt-2 px-2 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg">
            <p className="text-[8px] text-rose-400 leading-tight font-bold">
              [ 部署异常 ]: 密钥未注入。请在 GitHub Actions 中配置 API_KEY。
            </p>
          </div>
        ) : isApiOnline === false ? (
          <p className="text-[8px] text-slate-500 mt-2 px-2 leading-tight">
            注意：若此处显示异常，请学生检查是否开启了网络加速工具。
          </p>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
