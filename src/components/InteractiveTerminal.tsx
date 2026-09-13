import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, RotateCcw, Copy, Check } from 'lucide-react';
import { PROJECTS } from '../data/projectsData';
import { CONTACT_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'success';
  text: string;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme, setTheme } = useTheme();
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: 'Buike' },
    { type: 'input', text: 'currently_building' },
    { type: 'output', text: 'AI + Web Experiences' },
    { type: 'input', text: 'status' },
    { type: 'success', text: 'Building...' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [...history, { type: 'input', text: rawCmd }];

    switch (cmd) {
      case 'whoami':
        newHistory.push({ type: 'output', text: 'Buike — Web Developer & AI Builder.' });
        break;
      case 'role':
        newHistory.push({ type: 'output', text: 'Web Developer & AI Builder creating modern digital products.' });
        break;
      case 'currently_building':
        newHistory.push({ type: 'output', text: 'AI + Web Experiences, Modern E-Commerce, and Luxury Web Platforms.' });
        break;
      case 'status':
        newHistory.push({ type: 'success', text: 'Building...' });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Deployed 6 Real Projects:\n1. BUIKÉ (Clothing Store) -> https://buikeclothingstore.vercel.app/\n2. ChatBI (AI Assistant) -> https://chatbi-khaki.vercel.app/\n3. Amara Events -> https://amara-events-1.vercel.app/\n4. Aurelia Events -> https://aurelia-events-ten.vercel.app/\n5. Eventera -> https://event-book-delta.vercel.app/\n6. Luxury Cars -> https://cardealershiplandingpage.vercel.app/`,
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Tech Stack: HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS, Node.js, Express, Firebase, Firestore, MongoDB, PostgreSQL, Git, Vercel, AI API Integration.',
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${CONTACT_INFO.email}\nWhatsApp: ${CONTACT_INFO.phone}\nStatus: Open for opportunities`,
        });
        break;
      case 'theme':
        toggleTheme();
        newHistory.push({
          type: 'success',
          text: `Switched theme to ${theme === 'dark' ? 'light' : 'dark'} mode.`,
        });
        break;
      case 'theme light':
      case 'light':
        setTheme('light');
        newHistory.push({
          type: 'success',
          text: 'Switched to Light mode.',
        });
        break;
      case 'theme dark':
      case 'dark':
        setTheme('dark');
        newHistory.push({
          type: 'success',
          text: 'Switched to Dark mode.',
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available commands: whoami, role, currently_building, status, projects, skills, contact, theme, light, dark, clear, help',
        });
        break;
      default:
        newHistory.push({
          type: 'output',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const resetTerminal = () => {
    setHistory([
      { type: 'input', text: 'whoami' },
      { type: 'output', text: 'Buike' },
      { type: 'input', text: 'currently_building' },
      { type: 'output', text: 'AI + Web Experiences' },
      { type: 'input', text: 'status' },
      { type: 'success', text: 'Building...' },
    ]);
  };

  const copyLog = () => {
    const text = history.map((h) => `${h.type === 'input' ? '> ' : ''}${h.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#111111] p-6 rounded-lg border border-white/10 font-mono text-sm leading-relaxed shadow-2xl backdrop-blur-md">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors"></div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-white/40">
          <span className="text-[10px] tracking-widest uppercase">bash</span>
          <button
            onClick={copyLog}
            title="Copy terminal session"
            className="hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetTerminal}
            title="Reset Terminal"
            className="hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'input' ? (
              <div className="text-white/40">&gt; {line.text}</div>
            ) : line.type === 'success' ? (
              <div className="flex items-center text-white mb-2">
                <span className="text-emerald-400">{line.text}</span>
                <span className="ml-1 w-2 h-4 bg-white/60 animate-pulse inline-block"></span>
              </div>
            ) : (
              <div className="text-white mb-2 whitespace-pre-wrap">{line.text}</div>
            )}
          </div>
        ))}

        {/* Input prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center text-white pt-1"
        >
          <span className="text-white/40 mr-2 select-none">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            className="w-full bg-transparent outline-none text-white font-mono text-xs sm:text-sm placeholder-white/20"
          />
          <button type="submit" className="text-white/40 hover:text-white ml-1">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal quick-click chips */}
      <div className="pt-4 mt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-white/40">
        <span className="opacity-50">Quick:</span>
        {['whoami', 'currently_building', 'status', 'projects', 'skills', 'contact'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded border border-white/10 hover:border-white/40 text-white/60 hover:text-white transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

