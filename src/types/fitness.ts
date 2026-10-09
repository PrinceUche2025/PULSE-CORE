export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutLog {
  id: string;
  title: string;
  category: 'Strength' | 'Hypertrophy' | 'Cardio';
  durationMinutes: number;
  date: string;
  exercises: Exercise[];
}

export interface UserStats {
  totalWorkouts: number;
  currentStreak: number;
  totalVolumeLifted: number;
}