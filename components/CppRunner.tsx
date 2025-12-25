import React, { useEffect, useRef, useState } from 'react';

interface CppRunnerProps {
  code: string;
}

const CppRunner: React.FC<CppRunnerProps> = ({ code }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const stateRef = useRef({ active: true });
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setError(null);

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const helpers = {
      width: canvas.width,
      height: canvas.height,
      rand: () => Math.floor(Math.random() * 32768),
      background: (r: number, g: number, b: number, a: number = 255) => {
        ctx.fillStyle = `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${a / 255})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      },
      color: (r: number, g: number, b: number, a: number = 255) => {
        const colorStr = `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${a / 255})`;
        ctx.fillStyle = colorStr;
        ctx.strokeStyle = colorStr;
      },
      fontSize: (size: number) => {
        ctx.font = `bold ${Math.floor(size)}px 'Fira Code', monospace`;
      },
      drawText: (text: any, x: number, y: number) => {
        let safeText = String(text);
        if (safeText.length > 500) safeText = safeText.substring(0, 497) + "...";
        ctx.fillText(safeText, Math.floor(x), Math.floor(y));
      },
      drawCircle: (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(Math.floor(x), Math.floor(y), Math.max(0.1, Math.floor(r)), 0, Math.PI * 2);
        ctx.fill();
      },
      drawRect: (x: number, y: number, w: number, h: number) => {
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
      },
      char: (c: any) => {
        if (typeof c === 'string') return c[0] || '';
        return String.fromCharCode(c);
      },
      map: (v: number, i1: number, i2: number, o1: number, o2: number) => {
        return (v - i1) * (o2 - o1) / (i2 - i1) + o1;
      },
      fetchURL: async (url: string) => {
        try {
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&_=${Date.now()}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          const res = await fetch(proxyUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!res.ok) return `[ERR] 代理请求失败: ${res.status}`;
          const data = await res.json();
          let content = data.contents || "";
          if (content.length < 10) return "[ERR] 目标站点返回数据太少。";
          return content.replace(/`/g, "'").replace(/\${/g, "{").replace(/\r?\n/g, " "); 
        } catch (e: any) {
          return "[ERR] 获取失败: " + e.message;
        }
      },
      hex: (n: number) => (n >>> 0).toString(16).toUpperCase().padStart(2, '0'),
      sin: Math.sin, cos: Math.cos, abs: Math.abs, floor: Math.floor, sqrt: Math.sqrt, PI: Math.PI,
    };

    try {
      let cleaned = code.replace(/(".*?"|'.*?'|`.*?`|(?:\/\*[\s\S]*?\*\/|\/\/.*))/g, (match) => {
        if (match.startsWith('//') || match.startsWith('/*')) return '';
        return match;
      }).replace(/\r/g, '');

      const types = ['int', 'float', 'double', 'char', 'bool', 'String'];
      types.forEach(t => {
        const reg = new RegExp(`\\b${t}\\b\\s+([a-zA-Z_]\\w*)`, 'g');
        cleaned = cleaned.replace(reg, 'let $1');
      });

      cleaned = cleaned.replace(/let\s+(\w+)\[(\d+)\]\s*;/g, 'let $1 = new Array($2).fill(0);');

      let jsCode = cleaned
        .replace(/std::/g, '')
        .replace(/\.find\(/g, '.indexOf(')
        .replace(/fetchURL\s*\((.*?)\)/g, 'await helpers.fetchURL($1)')
        .replace(/\bvoid\b\s+(\w+)\s*\(([\s\S]*?)\)/g, (m, name, p) => `async function ${name}(${p.replace(/\b\w+\s+/g, '')})`)
        .replace(/struct\s+\w+\s*\{[\s\S]*?\};/g, ''); 

      const functionBody = 
        'return (async () => {\n' +
        '  const { width, height, rand, background, color, fontSize, drawText, drawCircle, drawRect, char, map, sin, cos, abs, floor, sqrt, PI, fetchURL, hex } = helpers;\n' +
        jsCode + '\n' +
        '  return { \n' +
        '    setup: typeof setup !== "undefined" ? setup : null, \n' +
        '    loop: typeof loop !== "undefined" ? loop : null \n' +
        '  };\n' +
        '})();';

      const exec = new Function('helpers', functionBody);
      const program = await exec(helpers);

      if (program.setup) await program.setup();

      const animate = async () => {
        if (!stateRef.current.active) return;
        try {
          if (program.loop) await program.loop();
          requestRef.current = requestAnimationFrame(animate);
        } catch (e: any) {
          setError(`[运行时异常] ${e.message}`);
        }
      };
      requestRef.current = requestAnimationFrame(animate);
    } catch (e: any) {
      setError(`[编译器错误] ${e.message}`);
    }
  };

  useEffect(() => {
    stateRef.current.active = true;
    const timer = setTimeout(runSimulation, 300);
    return () => {
      stateRef.current.active = false;
      clearTimeout(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [code]);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden border-4 border-slate-800 relative shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {error && (
        <div className="absolute inset-x-6 bottom-6 bg-rose-950/90 border-2 border-rose-500/50 p-5 rounded-2xl backdrop-blur-xl text-xs font-mono text-rose-100 shadow-2xl z-50">
          <div className="font-bold mb-2 flex items-center gap-2 text-rose-400 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" /></svg>
            系统排障报告：
          </div>
          <div className="whitespace-pre-wrap">{error}</div>
        </div>
      )}
    </div>
  );
};

export default CppRunner;