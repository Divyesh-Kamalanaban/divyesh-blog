import { motion, AnimatePresence } from 'motion/react';
import { Byte } from '../types';
import { Terminal, Copy, Check, Lightbulb, ArrowUpRight, Code, RefreshCw, Quote } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BytesViewProps {
  bytes: Byte[];
}

export default function Bytes({ bytes }: BytesViewProps) {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingOlder, setLoadingOlder] = useState<boolean>(false);

  const visibleBytes = useMemo(() => {
    return bytes.slice(0, visibleCount);
  }, [bytes, visibleCount]);

  const loadMoreBytes = () => {
    setLoadingOlder(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, bytes.length));
      setLoadingOlder(false);
    }, 600);
  };

  const handleCopyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-10">
      <header className="mb-4 border-b border-white/10 pb-8">
        <h1 className="font-sans font-black text-4xl md:text-6xl text-white mb-3 tracking-tighter uppercase leading-none">
          Bytes
        </h1>
        <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed uppercase tracking-widest max-w-2xl">
          Micro-updates, code snippets, and transient thoughts that don't quite fit into a full article. A digital scratchpad.
        </p>
      </header>

      <div className="columns-1 md:columns-2 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {visibleBytes.map((byte, idx) => {
            return (
              <motion.article
                key={byte.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="break-inside-avoid bg-neutral-950 border border-white/10 rounded-none overflow-hidden flex flex-col hover:border-white/20 transition-all group"
              >
                {byte.type !== 'quote' && (
                  <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                      {byte.fileName && (
                        <span className="ml-2.5 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                          {byte.fileName}
                        </span>
                      )}
                    </div>
                    <div>
                      {byte.type === 'snippet' && <Code className="w-3.5 h-3.5 text-white/40" />}
                      {byte.type === 'thought' && <Lightbulb className="w-3.5 h-3.5 text-white/40" />}
                      {byte.type === 'devlog' && <Terminal className="w-3.5 h-3.5 text-white/40" />}
                    </div>
                  </div>
                )}

                {byte.type === 'snippet' && byte.code && (
                  <div className="flex flex-col w-full">
                    <div className="p-5 border-b border-white/10 bg-neutral-950">
                      <span className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest block mb-1">
                        Snippet • {byte.date}
                      </span>
                      <h2 className="font-sans text-base md:text-lg font-extrabold text-white leading-snug">
                        {byte.title}
                      </h2>
                    </div>
                    <div className="p-5 bg-black text-white relative font-mono text-xs overflow-x-auto select-text leading-relaxed">
                      <button
                        onClick={() => handleCopyCode(byte.id, byte.code ?? '')}
                        className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-white transition-colors bg-neutral-900 border border-white/10 rounded-none transform active:scale-95"
                        title="Copy code snippet"
                        aria-label="Copy Code"
                      >
                        {copiedId === byte.id ? (
                          <Check className="w-3.5 h-3.5 text-[#00ecff]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <pre className="mt-2 text-xs leading-relaxed no-scrollbar whitespace-pre text-white/90">{byte.code}</pre>
                    </div>
                  </div>
                )}

                {byte.type === 'thought' && (
                  <div className="p-6 bg-neutral-900/40 flex flex-col min-h-[140px] border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-[#00ecff] font-mono text-[9px] uppercase tracking-widest mb-3 font-semibold">
                      <Lightbulb className="w-3.5 h-3.5 fill-current" />
                      <span>Thought • {byte.date}</span>
                    </div>
                    <p className="font-mono text-xs text-white/85 leading-relaxed whitespace-pre-wrap select-text">
                      <span className="text-[#00ecff]/80 font-bold">// </span>
                      {byte.content}
                    </p>
                  </div>
                )}

                {byte.type === 'discovery' && (
                  <div className="p-6 relative overflow-hidden flex flex-col w-full h-full justify-between min-h-[160px] bg-neutral-950">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-bl-full pointer-events-none -z-10 group-hover:scale-110 transition-transform"></div>
                    <div>
                      <span className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest block mb-2">
                        Discovery • {byte.date}
                      </span>
                      <h2 className="font-sans text-base md:text-lg font-extrabold text-white mb-3 flex items-center justify-between tracking-tight leading-snug">
                        {byte.title}
                        {byte.link ? (
                          <a href={byte.link} target="_blank" rel="noopener noreferrer" className="text-[#00ecff] hover:scale-110 transition-transform">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-[#00ecff]" />
                        )}
                      </h2>
                      <p className="font-sans text-xs text-white/70 mb-5 leading-relaxed select-text">
                        {byte.content}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 animate-fade-in">
                      {byte.tags?.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 bg-neutral-900 border border-white/10 text-[9px] font-sans font-bold uppercase tracking-wider text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {byte.type === 'devlog' && (
                  <div className="flex flex-col w-full">
                    <div className="h-28 bg-neutral-900 relative flex items-center justify-center border-b border-white/10 overflow-hidden">
                      <div className="absolute inset-0 opacity-10 font-mono text-[9px] translate-x-[-10px] scale-95 overflow-hidden text-clip select-none text-white/80">
                        {`$ git checkout -b next14-migration
Switched to a new branch 'next14-migration'
$ npm run build
vite v6.2.3 building for production...
✓ 412 modules transformed.
dist/server.js   84.12 kB
dist/client/     2.41 MB`}
                      </div>
                      <Terminal className="w-8 h-8 text-white/30 relative z-10" />
                    </div>
                    <div className="p-6 bg-neutral-950">
                      <span className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest block mb-1">
                        Devlog • {byte.date}
                      </span>
                      <h2 className="font-sans text-base md:text-lg font-extrabold text-white mb-3 leading-snug">
                        {byte.title}
                      </h2>
                      <p className="font-sans text-xs text-white/70 leading-relaxed select-text">
                        {byte.content}
                      </p>
                    </div>
                  </div>
                )}

                {byte.type === 'quote' && (
                  <div className="bg-white text-black rounded-none p-6 relative overflow-hidden select-text flex flex-col justify-between min-h-[160px]">
                    <div className="absolute -top-4 -left-4 text-black/5 pointer-events-none">
                      <Quote className="w-24 h-24 stroke-1 rotate-180" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <blockquote className="font-sans text-lg md:text-xl font-black uppercase tracking-tight mb-5 leading-none">
                        &quot;{byte.quoteText}&quot;
                      </blockquote>
                      <cite className="font-sans text-[10px] uppercase font-black tracking-widest text-[#00ecff] block text-right mt-auto">
                        — {byte.quoteAuthor}
                      </cite>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {visibleCount < bytes.length && (
        <div className="mt-8 flex justify-center pb-8 border-b border-white/10">
          <button
            onClick={loadMoreBytes}
            disabled={loadingOlder}
            className="px-6 py-3 border border-white/10 hover:border-white/30 text-white font-sans font-black text-[10px] uppercase tracking-widest rounded-none hover:bg-white/5 disabled:opacity-55 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00ecff] ${loadingOlder ? 'animate-spin' : ''}`} />
            {loadingOlder ? 'Loading Older Bytes...' : 'Load Older Bytes'}
          </button>
        </div>
      )}
    </div>
  );
}
