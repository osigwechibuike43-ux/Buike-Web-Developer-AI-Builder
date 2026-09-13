import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { GITHUB_URL } from '../data/portfolioData';

export function OpenSourceSection() {
  const [copied, setCopied] = useState(false);

  const sampleSnippet = `// Clean, modular React component architecture
export function useResponsiveView() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return { isMobile };
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-28 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
                Open Source &amp; Code
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              See How I Build<span className="text-white/30">.</span>
            </h2>

            <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
              "Clean patterns, type-safety, and zero unnecessary fluff."
            </p>

            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
              Explore my code, experiments, and projects on GitHub. I believe in writing readable, maintainable, and type-safe software with clean separation of concerns.
            </p>

            <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                Repository Architecture Highlights:
              </span>
              <ul className="space-y-2 text-xs text-white/80 font-sans">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-white"></span>
                  <span>Modular component patterns and declarative state hooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-white"></span>
                  <span>Strict TypeScript definitions and type safety across props</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-white"></span>
                  <span>Optimized Vercel builds with zero unused code overhead</span>
                </li>
              </ul>
            </div>

            <div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:invert transition-all inline-flex items-center gap-2 shadow-xl active:scale-95 cursor-pointer"
              >
                <span>View GitHub Profile &rarr;</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Code Architecture Window */}
          <div className="lg:col-span-6 w-full">
            <div className="border border-white/10 bg-[#070707] shadow-2xl overflow-hidden">
              {/* Code window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#0e0e0e] border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <span className="ml-3 text-xs font-mono text-white/50">
                    src/hooks/useResponsiveView.ts
                  </span>
                </div>

                <button
                  onClick={copyCode}
                  className="text-white/40 hover:text-white transition-colors"
                  title="Copy snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Code display */}
              <div className="p-6 font-mono text-xs sm:text-sm text-white/80 overflow-x-auto leading-relaxed bg-[#050505]">
                <pre>
                  <code>
                    <span className="text-white/40">// Clean, modular React component architecture</span>{'\n'}
                    <span className="text-white/50">export function</span> <span className="text-white font-bold">useResponsiveView</span>() {'{'}{'\n'}
                    {'  '}<span className="text-white/50">const</span> [isMobile, setIsMobile] = <span className="text-white">useState</span>(<span className="text-white/50">false</span>);{'\n\n'}
                    {'  '}<span className="text-white">useEffect</span>(() =&gt; {'{'}{'\n'}
                    {'    '}<span className="text-white/50">const</span> <span className="text-white/90">checkViewport</span> = () =&gt; setIsMobile(window.innerWidth &lt; <span className="text-white/90">768</span>);{'\n'}
                    {'    '}<span className="text-white/90">checkViewport</span>();{'\n'}
                    {'    '}window.addEventListener(<span className="text-white/70">'resize'</span>, checkViewport);{'\n'}
                    {'    '}<span className="text-white/50">return</span> () =&gt; window.removeEventListener(<span className="text-white/70">'resize'</span>, checkViewport);{'\n'}
                    {'  '}{'}'}, []);{'\n\n'}
                    {'  '}<span className="text-white/50">return</span> {'{'} isMobile {'}'};{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>

              {/* Footer status bar */}
              <div className="px-5 py-2.5 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  TypeScript 5.8 • Strict Mode
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

