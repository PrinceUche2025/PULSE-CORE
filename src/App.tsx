import { useState, useEffect } from 'react';
import { Terminal, Activity, Plus, Calendar, ShieldAlert, Dumbbell, Play, ArrowLeft, CheckCircle, XCircle, TrendingUp, Settings, Trash2, Filter, Cpu, Sun, Moon } from 'lucide-react';
import type { WorkoutLog, UserStats } from './types/fitness';
import { ProtocolModal } from './components/ProtocolModal';
import { HomeView } from './components/HomeView';

// 1. Primary Workout Categories with Complete Data
const PRIMARY_CATEGORIES = [
  {
    id: 'upper-body',
    title: 'UPPER BODY WORKOUT',
    subtitle: 'Chest, Shoulders, Back, Arms & Forearms',
    description: 'Comprehensive upper body protocols designed for hypertrophy, strength, and structural balance.',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    subsections: [
      {
        name: 'Neck & Traps',
        description: 'Targeted stabilization and thickness building for neck flexors and upper traps.',
        image: 'https://images.pexels.com/photos/7900678/pexels-photo-7900678.jpeg',
        exercises: [
          { name: 'Plate Neck Resistance Holds', sets: 3, reps: 15, weight: 10 },
          { name: 'Barbell Shrugs', sets: 4, reps: 12, weight: 80 }
        ]
      },
      {
        name: 'Shoulders (Deltoids)',
        description: 'Build 3D shoulder mass targeting anterior, lateral, and rear heads.',
        image: 'https://hips.hearstapps.com/hmg-prod/images/man-doing-pull-ups-in-the-local-park-royalty-free-image-1680687261.jpg?crop=1.00xw:0.755xh;0,0.161xh&resize=1800:*',
        exercises: [
          { name: 'Overhead Barbell Press', sets: 4, reps: 8, weight: 45 },
          { name: 'Dumbbell Lateral Raises', sets: 4, reps: 15, weight: 12 },
          { name: 'Rear Delt Cable Flyes', sets: 3, reps: 12, weight: 15 }
        ]
      },
      {
        name: 'Upper & Lower Back',
        description: 'Develop back width (lats) and spinal erector density.',
        image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Weighted Pull-Ups', sets: 3, reps: 6, weight: 10 },
          { name: 'Barbell Deadlift', sets: 3, reps: 5, weight: 110 },
          { name: 'Seated Cable Rows', sets: 3, reps: 10, weight: 60 }
        ]
      },
      {
        name: 'Arms (Biceps & Triceps)',
        description: 'Isolate arm flexors and extensors for maximum arm volume.',
        image: 'https://hips.hearstapps.com/hmg-prod/images/095e4b3c-44c3-4346-91e7-7af92f4d2b54.jpg?crop=0.513xw:1.00xh;0.107xw,0&resize=360:*',
        exercises: [
          { name: 'EZ-Bar Bicep Curls', sets: 3, reps: 10, weight: 30 },
          { name: 'Skull Crushers (Triceps)', sets: 3, reps: 10, weight: 35 },
          { name: 'Hammer Curls', sets: 3, reps: 12, weight: 14 }
        ]
      },
      {
        name: 'Forearms',
        description: 'Enhance grip strength and forearm muscularity.',
        image: 'https://images.pexels.com/photos/5327473/pexels-photo-5327473.jpeg',
        exercises: [
          { name: 'Wrist Curls (Barbell)', sets: 3, reps: 15, weight: 20 },
          { name: 'Farmer s Walks', sets: 3, reps: 1, weight: 30 }
        ]
      }
    ]
  },
  {
    id: 'lower-body',
    title: 'LOWER BODY WORKOUT',
    subtitle: 'Quads, Hamstrings, Glutes & Calves',
    description: 'Heavy compound leg protocols for explosive power, lower-body mass, and athletic drive.',
    level: 'Advanced',
    image: 'https://media.istockphoto.com/id/955454380/photo/cropped-view-of-sporty-female-bodybuilder-doing-lunges-on-black.jpg?s=1024x1024&w=is&k=20&c=mn_iv_FPUZVpdG6Qv-C6FoizTsvmlUphWScQXiaD6AU=',
    subsections: [
      {
        name: 'Quadriceps',
        description: 'Build knee extension power and quad sweep.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: 6, weight: 90 },
          { name: 'Leg Press', sets: 3, reps: 10, weight: 140 },
          { name: 'Leg Extensions', sets: 3, reps: 12, weight: 50 }
        ]
      },
      {
        name: 'Hamstrings & Glutes',
        description: 'Posterior chain focus for hip hinge strength and speed.',
        image: 'https://images.pexels.com/photos/13451969/pexels-photo-13451969.jpeg',
        exercises: [
          { name: 'Romanian Deadlifts', sets: 4, reps: 8, weight: 80 },
          { name: 'Lying Leg Curls', sets: 3, reps: 12, weight: 45 },
          { name: 'Hip Thrusts', sets: 3, reps: 10, weight: 100 }
        ]
      },
      {
        name: 'Calves',
        description: 'Lower leg definition and ankle stability.',
        image: 'https://media.istockphoto.com/id/1202786878/photo/trained-legs-with-muscular-calves-in-sneakers-in-training-gym-during-hard-fitness-and-gym.jpg?s=1024x1024&w=is&k=20&c=B5UhhTNFfa1Lwd0C5joJU1SurPW5Bhn3KYgEdnAcGSE=',
        exercises: [
          { name: 'Standing Calf Raises', sets: 4, reps: 15, weight: 60 },
          { name: 'Seated Calf Raises', sets: 3, reps: 15, weight: 40 }
        ]
      }
    ]
  },
  {
    id: 'endurance',
    title: 'ENDURANCE WORKOUT',
    subtitle: 'Stamina, Tempo & Work Capacity',
    description: 'Sustained sub-maximal load training designed to push your aerobic and muscular threshold.',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    subsections: [
      {
        name: 'Muscular Endurance Circuit',
        description: 'High repetition continuous resistance complexes with minimal rest.',
        image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Dumbbell Thrusters', sets: 4, reps: 15, weight: 15 },
          { name: 'Push-Up to Renegade Row', sets: 4, reps: 12, weight: 12 },
          { name: 'Kettlebell Swings', sets: 4, reps: 20, weight: 24 }
        ]
      },
      {
        name: 'Stamina Ramping',
        description: 'Extended duration low-rest intervals.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Rowing Machine Intervals', sets: 5, reps: 1, weight: 0 },
          { name: 'Assigned Bodyweight Complexes', sets: 4, reps: 25, weight: 0 }
        ]
      }
    ]
  },
  {
    id: 'cardio',
    title: 'CARDIO WORKOUT',
    subtitle: 'HIIT, Sprints & Heart Rate Conditioning',
    description: 'Explosive cardiovascular routines to torch fat, increase lung capacity, and improve heart rate variability.',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    subsections: [
      {
        name: 'High-Intensity Interval Training (HIIT)',
        description: 'Maximum effort bursts followed by active recovery.',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Treadmill Sprints', sets: 6, reps: 1, weight: 0 },
          { name: 'Battle Ropes', sets: 4, reps: 1, weight: 0 },
          { name: 'Burpee Box Jumps', sets: 4, reps: 12, weight: 0 }
        ]
      },
      {
        name: 'Steady-State Cardio',
        description: 'Consistent pace conditioning for cardiovascular baseline.',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Incline Treadmill Walk', sets: 1, reps: 1, weight: 0 },
          { name: 'Stationary Cycling', sets: 1, reps: 1, weight: 0 }
        ]
      }
    ]
  },
  {
    id: 'core-conditioning',
    title: 'CORE & CONDITIONING WORKOUT',
    subtitle: 'Abs, Obliques & Lower Back Stability',
    description: 'Armor your midsection with targeted kinetic stability routines.',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    subsections: [
      {
        name: 'Deep Core & Transverse Abdominis',
        description: 'Anti-rotation and bracing stability drills.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Weighted Plank Holds', sets: 3, reps: 1, weight: 15 },
          { name: 'Hollow Body Hold', sets: 3, reps: 1, weight: 0 }
        ]
      },
      {
        name: 'Dynamic Flexion & Obliques',
        description: 'Rotational power and abdominal definition.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
        exercises: [
          { name: 'Hanging Leg Raises', sets: 3, reps: 12, weight: 0 },
          { name: 'Russian Twists', sets: 3, reps: 20, weight: 10 },
          { name: 'Cable Woodchoppers', sets: 3, reps: 12, weight: 20 }
        ]
      }
    ]
  }
];

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'workouts' | 'logs'>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof PRIMARY_CATEGORIES[0] | null>(null);
  
  // Protocol Filter State
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  // Interactive Telemetry Targets State
  const [userTargets, setUserTargets] = useState(() => {
    const saved = localStorage.getItem('pulse_core_targets');
    return saved ? JSON.parse(saved) : { sessionGoal: 10, volumeTarget: 25000, streakTarget: 7 };
  });
  const [isEditingTargets, setIsEditingTargets] = useState(false);

  useEffect(() => {
    localStorage.setItem('pulse_core_targets', JSON.stringify(userTargets));
  }, [userTargets]);
  
  // Active Workout Execution State
  const [activeWorkoutSession, setActiveWorkoutSession] = useState<{
    title: string;
    category: 'Strength' | 'Hypertrophy' | 'Cardio';
    exercises: { name: string; sets: number; reps: number; weight: number; completedSets?: number[] }[];
  } | null>(null);

  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('pulse_core_workouts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pulse_core_workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleSaveWorkout = (newWorkout: WorkoutLog) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleClearHistory = () => {
    if (window.confirm("WARNING: Are you sure you want to purge all execution logs? This will reset your total volume load and session count to zero.")) {
      setWorkouts([]);
      localStorage.removeItem('pulse_core_workouts');
      alert("SUCCESS: Execution history purged from local storage buffer.");
    }
  };

  const handleStartActiveSession = (subName: string, categoryTitle: string, exercises: any[]) => {
    setActiveWorkoutSession({
      title: `${categoryTitle}: ${subName}`,
      category: 'Hypertrophy' as const,
      exercises: exercises.map(ex => ({ ...ex, completedSets: [] }))
    });
  };

  const handleToggleSetComplete = (exIndex: number, setNum: number) => {
    if (!activeWorkoutSession) return;
    const updated = { ...activeWorkoutSession };
    const targetEx = updated.exercises[exIndex];
    const setList = targetEx.completedSets || [];
    
    if (setList.includes(setNum)) {
      targetEx.completedSets = setList.filter(s => s !== setNum);
    } else {
      targetEx.completedSets = [...setList, setNum];
    }
    setActiveWorkoutSession(updated);
  };

  const handleFinishActiveSession = () => {
    if (!activeWorkoutSession) return;
    const completedLog: WorkoutLog = {
      id: Date.now().toString(),
      title: activeWorkoutSession.title,
      category: activeWorkoutSession.category,
      durationMinutes: 45,
      date: new Date().toISOString(),
      exercises: activeWorkoutSession.exercises
    };
    setWorkouts([completedLog, ...workouts]);
    setActiveWorkoutSession(null);
    setActiveTab('dashboard');
    alert("SUCCESS: Protocol executed, verified, and logged to records!");
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workouts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pulse_core_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsedWorkouts = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsedWorkouts)) {
            setWorkouts(parsedWorkouts);
            alert("SUCCESS: Your workout history has been successfully restored.");
          } else {
            alert("ERROR: This file does not match the correct workout history structure.");
          }
        } catch (error) {
          alert("ERROR: Could not read the uploaded backup file.");
        }
      };
    }
  };

  const stats: UserStats = {
    totalWorkouts: workouts.length,
    currentStreak: workouts.length > 0 ? 3 : 0,
    totalVolumeLifted: workouts.reduce((acc, curr) => {
      return acc + curr.exercises.reduce((exAcc, ex) => exAcc + (ex.weight * ex.reps * ex.sets), 0);
    }, 0)
  };

  const filteredCategories = PRIMARY_CATEGORIES.filter(cat => {
    if (filterLevel === 'ALL') return true;
    return cat.level.toUpperCase() === filterLevel;
  });

  return (
    <div className={`min-h-screen font-mono flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#030712] text-emerald-400 selection:bg-emerald-500 selection:text-black' : 'bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white'}`}>
      
      {/* Top System Telemetry Bar */}
      <header className={`border-b px-4 sm:px-8 py-3 flex items-center justify-between text-xs transition-colors ${isDarkMode ? 'border-emerald-950 bg-black/85' : 'border-slate-200 bg-white/90 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={`font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>PULSE_CORE // SYSTEM_KERNEL</span>
          <span className="hidden sm:inline text-emerald-600">| v1.0.0_STABLE</span>
        </div>
        
        <div className="flex items-center gap-4 text-[11px]">
          <span className={isDarkMode ? 'text-emerald-500/80' : 'text-slate-500'}>
            STATUS: <strong className="text-emerald-500">ONLINE</strong>
          </span>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${isDarkMode ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'}`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
          </button>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className={`border-b px-4 sm:px-8 flex items-center gap-6 text-xs overflow-x-auto transition-colors ${isDarkMode ? 'border-emerald-950/60 bg-black/40' : 'border-slate-200 bg-white'}`}>
        <button 
          onClick={() => { setActiveTab('home'); setSelectedCategory(null); setActiveWorkoutSession(null); }}
          className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'home' ? 'border-emerald-500 font-bold ' + (isDarkMode ? 'text-white' : 'text-slate-900') : 'border-transparent text-emerald-600 hover:text-emerald-400'}`}
        >
          <Cpu className="w-4 h-4 text-emerald-500" /> [00] SYSTEM_HOME
        </button>
        <button 
          onClick={() => { setActiveTab('dashboard'); setSelectedCategory(null); setActiveWorkoutSession(null); }}
          className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'dashboard' ? 'border-emerald-500 font-bold ' + (isDarkMode ? 'text-white' : 'text-slate-900') : 'border-transparent text-emerald-600 hover:text-emerald-400'}`}
        >
          <Activity className="w-4 h-4 text-emerald-500" /> [01] DASHBOARD
        </button>
        <button 
          onClick={() => { setActiveTab('workouts'); setActiveWorkoutSession(null); }}
          className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'workouts' ? 'border-emerald-500 font-bold ' + (isDarkMode ? 'text-white' : 'text-slate-900') : 'border-transparent text-emerald-600 hover:text-emerald-400'}`}
        >
          <Terminal className="w-4 h-4 text-amber-500" /> [02] PROTOCOLS (LIBRARY)
        </button>
        <button 
          onClick={() => { setActiveTab('logs'); setSelectedCategory(null); setActiveWorkoutSession(null); }}
          className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'logs' ? 'border-emerald-500 font-bold ' + (isDarkMode ? 'text-white' : 'text-slate-900') : 'border-transparent text-emerald-600 hover:text-emerald-400'}`}
        >
          <Calendar className="w-4 h-4 text-emerald-500" /> [03] EXECUTION_LOGS
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* ACTIVE WORKOUT SESSION RUNNER VIEW */}
        {activeWorkoutSession ? (
          <div className={`space-y-6 p-6 sm:p-8 rounded-2xl border shadow-xl ${isDarkMode ? 'bg-black/95 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)]' : 'bg-white border-slate-300 shadow-lg'}`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isDarkMode ? 'border-emerald-950' : 'border-slate-200'}`}>
              <div>
                <span className="text-[10px] bg-amber-500 text-black px-2.5 py-0.5 rounded font-black tracking-widest">
                  LIVE EXECUTION MODE
                </span>
                <h2 className={`text-xl sm:text-2xl font-black tracking-wide mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// {activeWorkoutSession.title}</h2>
                <p className={`text-xs ${isDarkMode ? 'text-emerald-600' : 'text-slate-500'}`}>Check off sets as you execute them to complete your live session telemetry.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveWorkoutSession(null)}
                  className="bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800 px-3 py-2 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" /> ABORT
                </button>
                <button 
                  onClick={handleFinishActiveSession}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded text-xs font-bold tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle className="w-4 h-4" /> COMPLETE SESSION
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {activeWorkoutSession.exercises.map((ex, exIdx) => (
                <div key={exIdx} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-emerald-950/20 border-emerald-950' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>&gt; {ex.name}</span>
                    <span className={`text-xs ${isDarkMode ? 'text-emerald-500' : 'text-emerald-700 font-semibold'}`}>{ex.weight}kg • {ex.reps} reps</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Array.from({ length: ex.sets }).map((_, setIdx) => {
                      const setNumber = setIdx + 1;
                      const isCompleted = ex.completedSets?.includes(setNumber);
                      return (
                        <button
                          key={setIdx}
                          onClick={() => handleToggleSetComplete(exIdx, setNumber)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${isCompleted ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : isDarkMode ? 'bg-black text-emerald-400 border-emerald-900 hover:border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'}`}
                        >
                          SET {setNumber} {isCompleted ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView 
                onNavigate={(tab) => setActiveTab(tab)} 
                workoutCount={workouts.length} 
                totalVolume={stats.totalVolumeLifted}
                currentStreak={stats.currentStreak}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-emerald-500 pl-4 py-1">
                  <div>
                    <h1 className={`text-xl sm:text-2xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// MISSION CONTROL</h1>
                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-emerald-600' : 'text-slate-600'}`}>Physical telemetry and performance indexing.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsEditingTargets(!isEditingTargets)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-colors border ${isDarkMode ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border-emerald-800' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'}`}
                    >
                      <Settings className="w-3.5 h-3.5" /> {isEditingTargets ? 'LOCK TARGETS' : 'EDIT TARGETS'}
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <Plus className="w-4 h-4" /> CREATE CUSTOM PROTOCOL
                    </button>
                  </div>
                </div>

                {/* Interactive Target Configurator Drawer */}
                {isEditingTargets && (
                  <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white border-slate-300 shadow-md'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// CONFIGURE TELEMETRY GOAL THRESHOLDS</h3>
                      <span className="text-[10px] text-emerald-500">Changes update rings instantly</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-emerald-600 uppercase font-bold">Target Sessions Goal</label>
                        <input 
                          type="number" 
                          value={userTargets.sessionGoal} 
                          onChange={(e) => setUserTargets({...userTargets, sessionGoal: Math.max(1, Number(e.target.value))})}
                          className={`w-full border rounded-xl px-3 py-1.5 text-xs outline-none ${isDarkMode ? 'bg-black border-emerald-800 text-white focus:border-emerald-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'}`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-amber-500 uppercase font-bold">Volume Target (KG)</label>
                        <input 
                          type="number" 
                          value={userTargets.volumeTarget} 
                          onChange={(e) => setUserTargets({...userTargets, volumeTarget: Math.max(100, Number(e.target.value))})}
                          className={`w-full border rounded-xl px-3 py-1.5 text-xs outline-none ${isDarkMode ? 'bg-black border-emerald-800 text-white focus:border-emerald-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'}`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-emerald-600 uppercase font-bold">Streak Goal (Days)</label>
                        <input 
                          type="number" 
                          value={userTargets.streakTarget} 
                          onChange={(e) => setUserTargets({...userTargets, streakTarget: Math.max(1, Number(e.target.value))})}
                          className={`w-full border rounded-xl px-3 py-1.5 text-xs outline-none ${isDarkMode ? 'bg-black border-emerald-800 text-white focus:border-emerald-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'}`} 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold">// COMPLETED SESSIONS</div>
                    <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stats.totalWorkouts}</div>
                    <div className="text-[11px] text-emerald-500/60">Protocols executed successfully</div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">// CONSISTENCY STREAK</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-500">{stats.currentStreak} DAYS</div>
                    <div className="text-[11px] text-emerald-500/60">Buffer status: Optimal</div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold">// TOTAL VOLUME LOAD</div>
                    <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stats.totalVolumeLifted.toLocaleString()} KG</div>
                    <div className="text-[11px] text-emerald-500/60">Cumulative resistance moved</div>
                  </div>
                </div>

                {/* Telemetry Performance Rings */}
                <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`flex items-center gap-2 border-b pb-3 ${isDarkMode ? 'border-emerald-950' : 'border-slate-200'}`}>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// TELEMETRY PERFORMANCE METRICS (INTERACTIVE)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center pt-2">
                    
                    {/* Ring 1 */}
                    <div className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/20 border-emerald-950' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">// DAILY ACTIVITY</div>
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" className={isDarkMode ? 'text-emerald-950/60 fill-none' : 'text-slate-200 fill-none'} />
                          <circle 
                            cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" 
                            className="text-emerald-500 fill-none transition-all duration-1000"
                            strokeDasharray="276"
                            strokeDashoffset={276 - (276 * Math.min(stats.totalWorkouts, userTargets.sessionGoal)) / userTargets.sessionGoal}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center text-center">
                          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stats.totalWorkouts}</span>
                          <span className="text-[9px] text-emerald-600">/ {userTargets.sessionGoal} GOAL</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        {Math.round((stats.totalWorkouts / userTargets.sessionGoal) * 100)}% Completed
                      </div>
                    </div>

                    {/* Ring 2 */}
                    <div className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/20 border-emerald-950' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">// VOLUME LOAD INDEX</div>
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" className={isDarkMode ? 'text-emerald-950/60 fill-none' : 'text-slate-200 fill-none'} />
                          <circle 
                            cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" 
                            className="text-amber-500 fill-none transition-all duration-1000"
                            strokeDasharray="276"
                            strokeDashoffset={276 - (276 * Math.min(stats.totalVolumeLifted, userTargets.volumeTarget)) / userTargets.volumeTarget}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center text-center">
                          <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stats.totalVolumeLifted}</span>
                          <span className="text-[9px] text-amber-500">/ {userTargets.volumeTarget} KG</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        {Math.round((stats.totalVolumeLifted / userTargets.volumeTarget) * 100)}% of Target
                      </div>
                    </div>

                    {/* Ring 3 */}
                    <div className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-2xl border sm:col-span-2 lg:col-span-1 ${isDarkMode ? 'bg-emerald-950/20 border-emerald-950' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">// STREAK BUFFER</div>
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" className={isDarkMode ? 'text-emerald-950/60 fill-none' : 'text-slate-200 fill-none'} />
                          <circle 
                            cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="6" 
                            className="text-emerald-500 fill-none transition-all duration-1000"
                            strokeDasharray="276"
                            strokeDashoffset={276 - (276 * Math.min(stats.currentStreak, userTargets.streakTarget)) / userTargets.streakTarget}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center text-center">
                          <span className="text-lg font-black text-emerald-500">{stats.currentStreak}D</span>
                          <span className="text-[9px] text-emerald-600">/ {userTargets.streakTarget}D GOAL</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        {Math.round((stats.currentStreak / userTargets.streakTarget) * 100)}% Consistency
                      </div>
                    </div>

                  </div>
                </div>

                {/* Data Backup Controls */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="space-y-0.5 text-left w-full sm:w-auto">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// DATA BACKUP & STORAGE</div>
                    <div className="text-[11px] text-emerald-600">Download, restore, or securely purge your local execution history buffer.</div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
                    <button 
                      onClick={handleClearHistory}
                      className="bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800 px-3.5 py-2 rounded-xl text-[11px] tracking-wider font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> PURGE HISTORY
                    </button>
                    <button 
                      onClick={handleExportData}
                      className={`px-3.5 py-2 rounded-xl text-[11px] tracking-wider font-bold cursor-pointer transition-colors border ${isDarkMode ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border-emerald-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'}`}
                    >
                      DOWNLOAD BACKUP
                    </button>
                    <label className="bg-emerald-500 hover:bg-emerald-400 text-black px-3.5 py-2 rounded-xl text-[11px] tracking-wider font-bold cursor-pointer transition-colors">
                      RESTORE BACKUP
                      <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Recent Executions */}
                {workouts.length === 0 ? (
                  <div className={`rounded-2xl p-6 sm:p-10 text-center space-y-4 border ${isDarkMode ? 'bg-black border-emerald-950/80' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
                    <div className="space-y-1">
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>SYSTEM READY FOR FIRST PROTOCOL</h3>
                      <p className="text-xs text-emerald-600 max-w-md mx-auto">
                        No active logs found in local buffer. Pick a routine from the <strong>Protocols</strong> tab or create your own to begin tracking!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// RECENT EXECUTIONS</h3>
                    <div className="grid gap-3">
                      {workouts.map((log) => (
                        <div key={log.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Dumbbell className="w-4 h-4 text-emerald-500" />
                              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{log.title}</span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-md border ${isDarkMode ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                                {log.category}
                              </span>
                            </div>
                            <div className="text-[11px] text-emerald-600">
                              {log.exercises.length} exercises logged • {log.durationMinutes} mins duration
                            </div>
                          </div>
                          <div className="text-right text-[11px] text-emerald-500/80">
                            {new Date(log.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'workouts' && !selectedCategory && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-amber-500 pl-4 py-1">
                  <div>
                    <h2 className={`text-xl font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// WORKOUT TEMPLATE LIBRARY</h2>
                    <p className="text-xs text-emerald-600">Select a core training domain or filter by intensity level.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    <Plus className="w-4 h-4" /> CUSTOM PROTOCOL
                  </button>
                </div>

                {/* Protocol Filter Bar */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-black/90 border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`flex items-center gap-2 text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Filter className="w-4 h-4 text-emerald-500" /> FILTER BY INTENSITY LEVEL:
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFilterLevel(level)}
                        className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${filterLevel === level ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : isDarkMode ? 'bg-black text-emerald-400 border-emerald-900 hover:border-emerald-700' : 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtered Categories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCategories.map((cat, index) => {
                    const isLast = index === filteredCategories.length - 1 && filteredCategories.length % 2 !== 0;
                    return (
                      <div 
                        key={cat.id} 
                        onClick={() => setSelectedCategory(cat)}
                        className={`group rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl relative border ${isLast ? 'lg:col-span-2 w-full' : ''} ${isDarkMode ? 'bg-black/90 border-emerald-950 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'}`}
                      >
                        <div className={`relative w-full overflow-hidden ${isLast ? 'h-80' : 'h-72'}`}>
                          <div className={`absolute inset-0 bg-gradient-to-t z-10 ${isDarkMode ? 'from-[#030712] via-black/40 to-transparent' : 'from-slate-950 via-slate-950/30 to-transparent'}`}></div>
                          <img 
                            src={cat.image} 
                            alt={cat.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                          />
                          <div className="absolute bottom-4 left-6 z-20 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-emerald-500 text-black px-2.5 py-1 rounded-md font-black tracking-widest">
                                DOMAIN // {cat.id.toUpperCase()}
                              </span>
                              <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-md font-black tracking-widest">
                                {cat.level.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase drop-shadow-md">{cat.title}</h3>
                          </div>
                        </div>

                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-xs text-amber-500 font-bold mb-1.5">{cat.subtitle}</div>
                            <p className="text-xs text-emerald-600 leading-relaxed">{cat.description}</p>
                          </div>

                          <div className={`pt-4 border-t flex items-center justify-between text-xs font-bold ${isDarkMode ? 'border-emerald-950/80 text-emerald-400 group-hover:text-white' : 'border-slate-200 text-slate-700 group-hover:text-slate-900'}`}>
                            <span>EXPLORE SUB-SECTIONS</span>
                            <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">&gt;&gt;</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drill-Down Subsections View */}
            {activeTab === 'workouts' && selectedCategory && (
              <div className="space-y-6">
                {/* Back button styled as an orange button */}
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK TO ALL WORKOUT DOMAINS
                </button>

                <div className="border-l-2 border-emerald-500 pl-4 py-1 space-y-1">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-md border font-bold ${isDarkMode ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                    ACTIVE DOMAIN
                  </span>
                  <h2 className={`text-2xl font-black tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// {selectedCategory.title}</h2>
                  <p className="text-xs text-emerald-600">{selectedCategory.subtitle} — Select any specific muscle group below to execute or log.</p>
                </div>

                {/* Subsections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCategory.subsections.map((sub, index) => {
                    const isSubLast = index === selectedCategory.subsections.length - 1 && selectedCategory.subsections.length % 2 !== 0;
                    return (
                      <div 
                        key={index} 
                        className={`group rounded-3xl overflow-hidden flex flex-col justify-between transition-all shadow-xl border ${isSubLast ? 'md:col-span-2 w-full' : ''} ${isDarkMode ? 'bg-black/90 border-emerald-950 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'}`}
                      >
                        <div className="relative w-full h-52 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-t z-10 ${isDarkMode ? 'from-[#030712] via-black/30 to-transparent' : 'from-slate-950 via-slate-950/30 to-transparent'}`}></div>
                          <img 
                            src={sub.image} 
                            alt={sub.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                          />
                          <div className="absolute bottom-3 left-4 z-20 flex items-center justify-between w-[90%]">
                            <h3 className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-wider drop-shadow-md">
                              &gt; {sub.name}
                            </h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold ${isDarkMode ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-900 text-white border-slate-800'}`}>
                              {sub.exercises.length} Exercises
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <p className="text-[11px] text-emerald-600">{sub.description}</p>
                            
                            <div className={`border-t pt-3 space-y-2 ${isDarkMode ? 'border-emerald-950/60' : 'border-slate-200'}`}>
                              {sub.exercises.map((ex, idx) => (
                                <div key={idx} className={`text-[11px] flex justify-between items-center px-3 py-2 rounded-xl border ${isDarkMode ? 'text-emerald-400/90 bg-emerald-950/20 border-emerald-950' : 'text-slate-700 bg-slate-50 border-slate-200'}`}>
                                  <span>{ex.name}</span>
                                  <span className="text-emerald-500 font-bold">{ex.sets} sets × {ex.reps} reps ({ex.weight}kg)</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button 
                            onClick={() => handleStartActiveSession(sub.name, selectedCategory.title, sub.exercises)}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border ${isDarkMode ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border-emerald-800 hover:border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'}`}
                          >
                            <Play className="w-3.5 h-3.5 text-emerald-500" /> EXECUTE {sub.name.toUpperCase()} PROTOCOL
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>// EXECUTION HISTORY ARCHIVE</h2>
                <p className="text-xs text-emerald-600">Complete raw telemetry log archive stored locally on your device.</p>
                
                <div className="space-y-2">
                  {workouts.map((log) => (
                    <div key={log.id} className={`p-5 rounded-2xl border text-xs space-y-2 ${isDarkMode ? 'bg-black border-emerald-950' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className={`flex justify-between font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <span>{log.title}</span>
                        <span className="text-emerald-500">{new Date(log.date).toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-emerald-600">
                        Category: {log.category} | Duration: {log.durationMinutes}m
                      </div>
                      <div className={`border-t pt-2 space-y-1 ${isDarkMode ? 'border-emerald-950/60' : 'border-slate-200'}`}>
                        {log.exercises.map((ex, i) => (
                          <div key={i} className={`text-[11px] flex justify-between ${isDarkMode ? 'text-emerald-400/90' : 'text-slate-700'}`}>
                            <span>&gt; {ex.name}</span>
                            <span>{ex.sets} sets × {ex.reps} reps @ {ex.weight}kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* Protocol Modal Component */}
      <ProtocolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWorkout}
      />

      {/* Footer */}
      <footer className={`border-t py-4 text-center text-[11px] ${isDarkMode ? 'border-emerald-950/60 text-emerald-600/60 bg-black/40' : 'border-slate-200 text-slate-500 bg-white'}`}>
        PRINCE-DEV // ENGINEERED FOR PEAK PERFORMANCE
      </footer>

    </div>
  );
}