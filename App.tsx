import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CppRunner from './components/CppRunner';
import ChatAssistant from './components/ChatAssistant';
import Login from './components/Login';
import Courseware from './components/Courseware';
import { LESSONS } from './constants';
import { Lesson, User } from './types';

type ViewMode = 'study' | 'code';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);
  const [code, setCode] = useState('');
  const [viewMode, setViewMode] = useState('study' as ViewMode);

  useEffect(() => {
    if (user) {
      const targetCode = user.role === 'teacher' ? currentLesson.initialCode : currentLesson.skeletonCode;
      setCode(targetCode);
    }
  }, [user, currentLesson]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleExport = () => {
    const el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob([code], {type: 'text/plain'}));
    el.download = `${currentLesson.id}.cpp`;
    el.click();
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar 
        currentLessonId={currentLesson.id} 
        onSelectLesson={(l) => { setCurrentLesson(l); setViewMode('study'); }}
        user={user}
        onLogout={() => setUser(null)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between px-8 shrink-0 backdrop-blur-xl z-30">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white tracking-tight">{currentLesson.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                {user.role === 'teacher' ? '高级讲师模式' : '极客学员模式'}
              </span>
            </div>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button 
              onClick={() => setViewMode('study')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                viewMode === 'study' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              📖 知识讲解
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                viewMode === 'code' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              💻 动手实践
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold border border-slate-700 transition-all"
            >
              导出代码
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-6 bg-slate-950/50">
          {viewMode === 'study' ? (
            <div className="h-full animate-in fade-in zoom-in duration-500">
              <Courseware lessonId={currentLesson.id} slides={currentLesson.slides} />
            </div>
          ) : (
            <div className="h-full flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex-1 flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">code_editor.cpp</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-transparent p-8 text-base text-blue-300 font-mono outline-none resize-none leading-relaxed"
                  spellCheck={false}
                  placeholder="// 在此输入您的创意代码..."
                />
                <div className="h-32 bg-slate-950 p-5 font-mono text-xs border-t border-slate-800">
                   <div className="text-slate-500 mb-2 uppercase tracking-widest font-bold flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                     编译器终端 (Console)
                   </div>
                   <div className="text-emerald-500/80 mt-1">● 视觉引擎已就绪</div>
                   <div className="text-slate-500 mt-1">● 正在监听代码变更并实时渲染...</div>
                </div>
              </div>

              <div className="w-[500px] flex flex-col gap-6">
                <div className="flex-1 min-h-[300px]">
                  <CppRunner code={code} />
                </div>
                <div className="h-[360px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                  <ChatAssistant currentCode={code} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;