import { Activity, Flame, Trophy, ArrowRight, Play, Dumbbell, ShieldCheck, Cpu } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: 'dashboard' | 'workouts' | 'logs') => void;
  workoutCount: number;
  totalVolume: number;
  currentStreak: number;
  isDarkMode: boolean;
}

export function HomeView({ onNavigate, workoutCount, totalVolume, currentStreak, isDarkMode }: HomeViewProps) {
  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      
      {/* Full-Bleed Edge-to-Edge Hero Banner with High-Visibility Image */}
      <div className={`relative border p-8 sm:p-16 rounded-3xl overflow-hidden shadow-2xl space-y-6 transition-colors ${isDarkMode ? 'bg-black border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)] text-slate-100' : 'bg-slate-900 border-slate-700 shadow-xl text-white'}`}>
        
        {/* Background Image with Lateral Gradient (Dark on left for text, vibrant image on right) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r z-10 ${isDarkMode ? 'from-black via-black/70 to-transparent' : 'from-slate-950 via-slate-950/70 to-transparent'}`}></div>
          <img 
            src="https://images.pexels.com/photos/5327553/pexels-photo-5327553.jpeg" 
            alt="Brian Silva Athletic Performance" 
            className="w-full h-full object-cover object-right opacity-150 scale-105"
          />
        </div>

        {/* Content Over Full-Bleed Image */}
        <div className="relative z-20 max-w-xl space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide font-mono backdrop-blur-md border ${isDarkMode ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 font-bold'}`}>
            <Cpu className="w-3.5 h-3.5" /> PULSE-CORE PORTFOLIO SPEC // 2026 EDITION
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-mono drop-shadow-lg text-white">
            ELEVATE YOUR <span className="text-emerald-400">PERFORMANCE</span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-200 drop-shadow-md">
            A next-generation athletic telemetry platform engineered with React, TypeScript, and Tailwind CSS. Seamlessly transition from deep-dive metrics to structured execution protocols.
          </p>
        </div>

        <div className="relative z-20 flex flex-wrap items-center gap-4 pt-2 font-mono">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-7 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            Launch Mission Control <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('workouts')}
            className={`px-7 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors backdrop-blur-md border ${isDarkMode ? 'bg-black/60 text-emerald-400 border-emerald-700/80 hover:bg-emerald-950/80' : 'bg-slate-800 text-emerald-400 border-slate-600 hover:bg-slate-700'}`}
          >
            Explore Protocols
          </button>
        </div>
      </div>

      {/* Modern Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono">
        
        <div className={`p-6 rounded-3xl space-y-3 relative overflow-hidden group transition-all border ${isDarkMode ? 'bg-black/90 border-emerald-950 hover:border-emerald-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500'}`}>
          <div className="flex items-center justify-between text-emerald-500">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-emerald-500' : 'text-slate-700 font-bold'}`}>Completed Sessions</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{workoutCount}</div>
          <p className={`text-xs font-sans ${isDarkMode ? 'text-emerald-600' : 'text-slate-600 font-medium'}`}>Protocols executed successfully</p>
        </div>

        <div className={`p-6 rounded-3xl space-y-3 relative overflow-hidden group transition-all border ${isDarkMode ? 'bg-black/90 border-emerald-950 hover:border-amber-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-amber-500'}`}>
          <div className="flex items-center justify-between text-amber-500">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-amber-400' : 'text-slate-700 font-bold'}`}>Total Volume Load</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-500">{totalVolume.toLocaleString()} KG</div>
          <p className={`text-xs font-sans ${isDarkMode ? 'text-emerald-600' : 'text-slate-600 font-medium'}`}>Cumulative resistance moved</p>
        </div>

        <div className={`p-6 rounded-3xl space-y-3 relative overflow-hidden group transition-all border ${isDarkMode ? 'bg-black/90 border-emerald-950 hover:border-emerald-500/40' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500'}`}>
          <div className="flex items-center justify-between text-emerald-500">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-emerald-500' : 'text-slate-700 font-bold'}`}>Consistency Streak</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-500">{currentStreak} DAYS</div>
          <p className={`text-xs font-sans ${isDarkMode ? 'text-emerald-600' : 'text-slate-600 font-medium'}`}>Buffer status: Optimal</p>
        </div>

      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        
        <div className={`p-7 rounded-3xl space-y-4 transition-colors border ${isDarkMode ? 'bg-black/80 border-emerald-950 hover:border-emerald-800' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <Play className="w-6 h-6" />
          </div>
          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Live Execution Mode</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-emerald-600' : 'text-slate-700 font-medium'}`}>
            Interactive workout runner allowing you to check off sets, log exact weights, and record completion telemetry seamlessly.
          </p>
        </div>

        <div className={`p-7 rounded-3xl space-y-4 transition-colors border ${isDarkMode ? 'bg-black/80 border-emerald-950 hover:border-emerald-800' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Circular Telemetry Rings</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-emerald-600' : 'text-slate-700 font-medium'}`}>
            Dynamic SVG performance rings that scale in real time against your customizable weekly goals and volume targets.
          </p>
        </div>

        <div className={`p-7 rounded-3xl space-y-4 transition-colors border ${isDarkMode ? 'bg-black/80 border-emerald-950 hover:border-emerald-800' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Secure Data Persistence</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-emerald-600' : 'text-slate-700 font-medium'}`}>
            Complete local storage backup and restore capabilities with zero server latency and instantaneous history resets.
          </p>
        </div>

      </div>

    </div>
  );
}