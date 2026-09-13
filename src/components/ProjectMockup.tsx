import { useState } from 'react';
import { ExternalLink, Smartphone, Monitor, Sparkles, Bot, Send } from 'lucide-react';
import { Project } from '../types';

interface ProjectMockupProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export function ProjectMockup({ project, onOpenCaseStudy }: ProjectMockupProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="relative group rounded-none border border-white/10 bg-[#070707] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/30">
      {/* Browser chrome header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0e0e0e] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          <span className="hidden sm:inline-block ml-3 text-[11px] font-mono text-white/50 truncate max-w-[220px]">
            {project.liveUrl.replace('https://', '')}
          </span>
        </div>

        {/* Device toggle & Actions */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-black/60 border border-white/10 p-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('desktop');
              }}
              title="Desktop View"
              className={`p-1.5 text-xs transition-colors ${
                viewMode === 'desktop' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('mobile');
              }}
              title="Mobile View"
              className={`p-1.5 text-xs transition-colors ${
                viewMode === 'mobile' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Open Live Website in New Tab"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1 border border-white/20 text-white hover:bg-white hover:text-black transition-all font-medium"
          >
            <span>Live</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Mockup Canvas */}
      <div
        onClick={onOpenCaseStudy}
        className="relative cursor-pointer bg-[#050505] overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center justify-center p-4 sm:p-6 select-none"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>

        {/* View Mode: Desktop Mockup */}
        {viewMode === 'desktop' && (
          <div className="w-full h-full max-w-full border border-white/10 bg-black overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
            <RenderMockupContent project={project} isMobile={false} />
          </div>
        )}

        {/* View Mode: Mobile Mockup */}
        {viewMode === 'mobile' && (
          <div className="w-[260px] sm:w-[280px] h-[400px] rounded-2xl border-2 border-white/20 bg-black overflow-hidden shadow-2xl p-2 transition-transform duration-500 group-hover:scale-[1.02] relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-2 bg-white/20 rounded-full z-20"></div>
            <div className="w-full h-full overflow-hidden bg-[#0a0a0a] pt-4">
              <RenderMockupContent project={project} isMobile={true} />
            </div>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
          <div className="px-5 py-2.5 bg-white text-black text-xs font-mono tracking-widest uppercase font-bold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            Case Study &amp; Live Frame
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderMockupContent({ project, isMobile }: { project: Project; isMobile: boolean }) {
  switch (project.caseStudy.desktopMockupType) {
    case 'fashion':
      return (
        <div className="w-full h-full bg-neutral-950 text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
            <span className="font-display font-black tracking-widest text-lg sm:text-xl">BUIKÉ</span>
            <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
              <span>LOOKBOOK</span>
              <span>SHOP</span>
              <span className="bg-white text-black px-2 py-0.5 rounded-sm font-semibold">CART (0)</span>
            </div>
          </div>

          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase border border-neutral-800 px-2 py-0.5 rounded">
                AUTUMN / WINTER 2026
              </span>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                MONOCHROME LUXURY APPAREL
              </h4>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Heavyweight raw cotton, structured silhouettes, and minimal branding designed for the modern avant-garde.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-mono text-white bg-neutral-800 px-3 py-1.5 rounded">
                  EXPLORE DROP
                </span>
                <span className="text-xs font-mono text-neutral-400">LIMITED EDITION</span>
              </div>
            </div>

            {!isMobile && (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-neutral-900 border border-neutral-800 rounded p-3 text-center">
                  <div className="h-24 bg-neutral-800 rounded flex items-center justify-center font-mono text-[10px] text-neutral-400 border border-neutral-700/50 mb-2">
                    OVERSIZED HOODIE
                  </div>
                  <span className="text-[11px] font-mono text-white font-medium block">NOIR HOODIE 01</span>
                  <span className="text-[10px] font-mono text-neutral-400">$180.00</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded p-3 text-center">
                  <div className="h-24 bg-neutral-800 rounded flex items-center justify-center font-mono text-[10px] text-neutral-400 border border-neutral-700/50 mb-2">
                    STRUCTURED TEE
                  </div>
                  <span className="text-[11px] font-mono text-white font-medium block">SIGNATURE TEE</span>
                  <span className="text-[10px] font-mono text-neutral-400">$85.00</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span>VERIFIED VERCEL DEPLOYMENT</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      );

    case 'chatbi':
      return (
        <div className="w-full h-full bg-[#050507] text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black tracking-wider text-base text-white">ChatBI</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
                <p className="text-[9px] font-mono text-white/40">AI ASSISTANT &amp; WORKSPACE</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="hidden sm:inline px-2 py-0.5 border border-white/10 bg-white/5">GPT-4o Engine</span>
              <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-wider">NEW CHAT</span>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="my-4 space-y-3 flex-1 overflow-hidden">
            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-white/10 border border-white/15 p-3 rounded-none text-right space-y-1">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">YOU</span>
                <p className="text-xs sm:text-sm text-white/90 font-sans">
                  "Analyze our store's checkout conversion and generate recommendations for improving retention."
                </p>
              </div>
            </div>

            {/* AI Assistant response */}
            <div className="flex justify-start">
              <div className="max-w-[92%] bg-[#0e0e11] border border-white/10 p-3.5 rounded-none space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white text-black flex items-center justify-center text-[10px] font-bold">
                      B
                    </div>
                    <span className="text-[10px] font-mono text-white/70 font-bold uppercase tracking-wider">ChatBI Assistant</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/30">0.24s latency</span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  Here is an automated audit based on your recent traffic and conversion signals:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[9px]">DROP-OFF POINT</span>
                    <span className="text-white font-bold">Step 2 (Shipping Rates)</span>
                  </div>
                  <div className="p-2 bg-white/5 border border-white/10">
                    <span className="text-white/40 block text-[9px]">ACTION PLAN</span>
                    <span className="text-emerald-400 font-bold">Add Free Shipping Bar</span>
                  </div>
                </div>

                {!isMobile && (
                  <div className="p-2.5 bg-black/60 border border-white/5 font-mono text-[10px] text-white/70 flex items-center justify-between">
                    <span>💡 Recommendation: Enable one-click checkout to recover ~18% lost orders.</span>
                    <span className="text-[9px] text-white/40">Apply Script →</span>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Suggestion Chips */}
            {!isMobile && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Synthesize Meeting Notes', 'Draft Launch Campaign', 'Audit API Latency'].map((prompt, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 hover:text-white hover:border-white/30 cursor-pointer transition-colors"
                  >
                    + {prompt}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Chat Input Frame */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between bg-[#0a0a0c] border border-white/15 px-3 py-2 text-xs font-mono">
              <span className="text-white/40 truncate">Ask ChatBI anything or press / for workflows...</span>
              <div className="w-6 h-6 bg-white text-black flex items-center justify-center shrink-0 ml-2">
                <Send className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-white/30 pt-1.5">
              <span>LIVE DEMO: chatbi-khaki.vercel.app</span>
              <span>ENTER TO SEND</span>
            </div>
          </div>
        </div>
      );

    case 'amara':
      return (
        <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
            <span className="font-luxury font-semibold tracking-widest text-lg text-amber-200">
              AMARA EVENTS
            </span>
            <span className="text-[10px] font-mono text-amber-200/70 uppercase tracking-wider">
              NIGERIA & GLOBAL
            </span>
          </div>

          <div className="my-6 space-y-3">
            <span className="text-[10px] font-mono text-amber-300/80 tracking-widest uppercase">
              LUXURY EVENT PLANNING & PRODUCTION
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-light text-neutral-100 italic">
              "Crafting unforgettable milestone celebrations with uncompromising opulence."
            </h4>
            <p className="text-xs text-neutral-400 max-w-md">
              Full-service production for bespoke traditional weddings, high-society galas, and international corporate gatherings.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-neutral-900/80 border border-amber-500/20 p-2 rounded text-center">
                <span className="text-[10px] font-mono text-amber-300 block">WEDDINGS</span>
                <span className="text-[9px] text-neutral-400">Bespoke Design</span>
              </div>
              <div className="bg-neutral-900/80 border border-amber-500/20 p-2 rounded text-center">
                <span className="text-[10px] font-mono text-amber-300 block">GALAS</span>
                <span className="text-[9px] text-neutral-400">Full Production</span>
              </div>
              <div className="bg-neutral-900/80 border border-amber-500/20 p-2 rounded text-center">
                <span className="text-[10px] font-mono text-amber-300 block">DESTINATIONS</span>
                <span className="text-[9px] text-neutral-400">Global Logistics</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span>CONSULTATION & BOOKING</span>
            <span>LAGOS • ABUJA • LONDON</span>
          </div>
        </div>
      );

    case 'aurelia':
      return (
        <div className="w-full h-full bg-[#0c0c0e] text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <span className="font-serif tracking-widest text-lg text-neutral-200">
              AURELIA EVENTS
            </span>
            <div className="text-[10px] font-mono text-neutral-400">
              <span>CELEBRATIONS & WEDDINGS</span>
            </div>
          </div>

          <div className="my-6 space-y-3">
            <div className="inline-block border border-neutral-700 px-2.5 py-0.5 rounded text-[10px] font-mono text-neutral-300">
              EDITORIAL STORYTELLING
            </div>
            <h4 className="text-xl sm:text-2xl font-serif text-white tracking-wide">
              Timeless Moments, Curated With Elegance.
            </h4>
            <p className="text-xs text-neutral-400 max-w-md">
              From romantic destination weddings to private anniversary banquets, creating spaces filled with warmth and poetry.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-neutral-300">
                Floral Direction
              </span>
              <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-neutral-300">
                Atmospheric Lighting
              </span>
              <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-neutral-300">
                Culinary Experience
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span>PORTFOLIO SHOWCASE</span>
            <span>RESERVE DATE</span>
          </div>
        </div>
      );

    case 'eventera':
      return (
        <div className="w-full h-full bg-neutral-950 text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white text-black font-bold flex items-center justify-center text-xs">
                E
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white">Eventera</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">FIND YOUR NEXT MOMENT</span>
          </div>

          <div className="my-5 space-y-3">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center justify-between text-xs text-neutral-400">
              <span>🔍 Search concerts, tech summits, nightlife...</span>
              <span className="font-mono text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">All Dates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-lg space-y-1.5">
                <span className="text-[9px] font-mono bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded">MUSIC FESTIVAL</span>
                <p className="text-xs font-semibold text-white">Lagos Sound Odyssey 2026</p>
                <p className="text-[10px] text-neutral-400">Oct 14 • Landmark Beach</p>
              </div>
              <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-lg space-y-1.5">
                <span className="text-[9px] font-mono bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded">TECH CONFERENCE</span>
                <p className="text-xs font-semibold text-white">NextGen AI Builders Forum</p>
                <p className="text-[10px] text-neutral-400">Nov 02 • Eko Convention Center</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800 pt-2">
            <span>DISCOVER • BOOK • ATTEND</span>
            <span>GET PASSES →</span>
          </div>
        </div>
      );

    case 'cars':
      return (
        <div className="w-full h-full bg-[#08080a] text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <span className="font-display font-black tracking-widest text-lg text-white">
              LUXURY CARS
            </span>
            <span className="text-[10px] font-mono text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
              EXCLUSIVE SHOWROOM
            </span>
          </div>

          <div className="my-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block">FEATURED SPECIMEN</span>
                <h4 className="text-xl font-bold tracking-tight text-white">PORSCHE 911 GT3 RS</h4>
              </div>
              <span className="text-sm font-mono text-white font-semibold">$241,300</span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg text-center font-mono">
              <div>
                <span className="text-[9px] text-neutral-400 block">0-60 MPH</span>
                <span className="text-xs font-bold text-white">3.0 SEC</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-400 block">TOP SPEED</span>
                <span className="text-xs font-bold text-white">184 MPH</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-400 block">HORSEPOWER</span>
                <span className="text-xs font-bold text-white">518 HP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800 pt-2">
            <span>INVENTORY CATALOG</span>
            <span>BOOK TEST DRIVE</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
