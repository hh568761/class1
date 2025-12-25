
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hintIndex, setHintIndex] = useState(0);

  const hints = [
    "观察背景中的系统日志，寻找权限凭证...",
    "提示：教师 ID 是 00，学生 ID 是 11",
    "提示：初始安全口令为 123456"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 直接进行身份校验，不再拦截 API Key 授权
    if (userId === '00' && password === '123456') {
      onLogin({ id: '00', role: 'teacher', name: '黄老师' });
    } else if (userId === '11' && password === '123456') {
      onLogin({ id: '11', role: 'student', name: '小极客' });
    } else {
      setError('ACCESS_DENIED: INVALID_CREDENTIALS');
      setHintIndex((prev) => (prev + 1) % hints.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* 极客背景层：将账号密码伪装在流动的内核日志中 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none font-mono text-[10px] leading-relaxed overflow-hidden select-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap flex gap-8 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="text-blue-900">[{new Date().toISOString()}]</span>
            <span className="text-slate-800">KERNEL_READY: 0x{Math.random().toString(16).slice(2, 10)}</span>
            <span className="text-slate-700">SYS_AUTH_TABLE: LOADED</span>
            {i % 8 === 0 && <span className="text-blue-500/40">HINT_LOG: UID=00_ROOT_USER_ACTIVE</span>}
            {i % 12 === 0 && <span className="text-emerald-500/40">HINT_LOG: PWD_DEFAULT_123456</span>}
            <span className="text-slate-800">MEM_CHECK: OK</span>
          </div>
        ))}
      </div>

      <div className="max-w-md w-full bg-slate-900/40 border border-blue-500/20 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(0,0,0,1)] backdrop-blur-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-[0_20px_40px_rgba(37,99,235,0.3)]">
              <span className="text-4xl font-black italic text-white tracking-tighter">C++</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white tracking-[0.15em] uppercase">
            极客攻防实验室
          </h1>
          <p className="text-blue-400/50 mt-3 font-mono text-[10px] uppercase tracking-[0.4em]">Integrated Security Training System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex items-center gap-2 mb-6 justify-center py-2 px-4 bg-emerald-500/5 border border-emerald-500/20 rounded-full w-fit mx-auto">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">System Engine Ready</span>
          </div>
          
          <div className="space-y-4">
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-[#0d1425] text-[9px] font-black text-blue-500/60 uppercase tracking-widest z-10">Terminal ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="请输入学号或终端 ID"
                className="w-full bg-black/40 border border-slate-800 group-hover:border-blue-500/30 rounded-2xl py-4 px-6 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm placeholder:text-slate-700"
                required
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-[#0d1425] text-[9px] font-black text-blue-500/60 uppercase tracking-widest z-10">Security Pass</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入访问秘钥"
                className="w-full bg-black/40 border border-slate-800 group-hover:border-blue-500/30 rounded-2xl py-4 px-6 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm placeholder:text-slate-700"
                required
              />
            </div>
          </div>

          {error && (
            <div className="space-y-2">
              <div className="text-rose-500 text-[10px] font-black font-mono text-center uppercase tracking-tighter animate-bounce">
                [ ERROR ] {error}
              </div>
              <p className="text-center text-[9px] text-slate-500 font-mono italic">
                * {hints[hintIndex]}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm"
          >
            启动实验室
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest">
            AI 辅助模块已自动加载
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-center w-full">
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em]">
          Classified Information - Internal Use Only
        </p>
      </div>
    </div>
  );
};

export default Login;
