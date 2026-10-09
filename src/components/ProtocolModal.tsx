import React, { useState } from 'react';
import { X, Plus, Trash2, Dumbbell } from 'lucide-react';
import type { WorkoutLog, Exercise } from '../types/fitness';

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: WorkoutLog) => void;
}

export function ProtocolModal({ isOpen, onClose, onSave }: ProtocolModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Strength' | 'Hypertrophy' | 'Cardio'>('Strength');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: 3, reps: 10, weight: 0 }
  ]);

  if (!isOpen) return null;

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: 10, weight: 0 }]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a workout title.');
      return;
    }

    const newWorkout: WorkoutLog = {
      id: Date.now().toString(),
      title,
      category,
      durationMinutes,
      date: new Date().toISOString(),
      exercises
    };

    onSave(newWorkout);
    setTitle('');
    setExercises([{ name: '', sets: 3, reps: 10, weight: 0 }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-black border border-emerald-500/40 w-full max-w-2xl rounded shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-emerald-950/40 border-b border-emerald-900/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span>// INITIALIZE NEW WORKOUT</span>
          </div>
          <button 
            onClick={onClose}
            className="text-emerald-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Workout Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Workout Title</label>
              <input 
                type="text" 
                placeholder="e.g., Upper Body Hypertrophy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-emerald-900 rounded px-3 py-2 text-xs text-white placeholder-emerald-700/60 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-black border border-emerald-900 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Strength">Strength</option>
                <option value="Hypertrophy">Hypertrophy</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Duration (Minutes)</label>
            <input 
              type="number" 
              min="1"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full bg-black border border-emerald-900 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Exercises Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-950 pb-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Exercises & Performance</span>
              <button 
                type="button"
                onClick={handleAddExercise}
                className="text-xs text-emerald-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> ADD EXERCISE
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {exercises.map((ex, index) => (
                <div key={index} className="bg-emerald-950/10 border border-emerald-900/50 p-3 rounded space-y-3">
                  
                  {/* Exercise Name */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Exercise Name (e.g., Bench Press)"
                      value={ex.name}
                      onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                      className="flex-1 bg-black border border-emerald-900 rounded px-3 py-1.5 text-xs text-white placeholder-emerald-700/60 focus:outline-none focus:border-emerald-500"
                      required
                    />
                    {exercises.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveExercise(index)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Sets, Reps, Weight Grid with Clear Labels */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-emerald-500 uppercase tracking-wider block">Sets</label>
                      <input 
                        type="number" 
                        min="1"
                        value={ex.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', Number(e.target.value))}
                        className="w-full bg-black border border-emerald-900 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-emerald-500 uppercase tracking-wider block">Reps</label>
                      <input 
                        type="number" 
                        min="1"
                        value={ex.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', Number(e.target.value))}
                        className="w-full bg-black border border-emerald-900 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-emerald-500 uppercase tracking-wider block">Weight (kg)</label>
                      <input 
                        type="number" 
                        min="0"
                        step="0.5"
                        value={ex.weight}
                        onChange={(e) => handleExerciseChange(index, 'weight', Number(e.target.value))}
                        className="w-full bg-black border border-emerald-900 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-950">
            <button 
              type="button"
              onClick={onClose}
              className="bg-black hover:bg-emerald-950/40 text-emerald-400 border border-emerald-900 px-4 py-2 rounded text-xs font-bold tracking-wider cursor-pointer transition-colors"
            >
              ABORT
            </button>
            <button 
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2 rounded text-xs font-bold tracking-wider cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              SAVE WORKOUT
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}