  /**
 * @file index.ts
 * @description Interfaces for the calendar application and API responses
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import { Dayjs } from "dayjs";
import { ReactNode } from 'react';

export interface IWeek {
    week: number;
    days: Dayjs[];
    date: string;
  }


// Calendar Context Interfaces
export interface CalendarContextType {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  truncate: boolean;
  setTruncate: (truncate: boolean) => void;
  createRestDay: (date: string) => Promise<void>;
  createNewDay: (date: string) => Promise<void>;
  loading: boolean;
  programData: ApiResponse | null;
}

export interface CalendarProviderProps {
  children: ReactNode;
  id_program: string;
  base_url: string;
}

// API Response Interfaces
export interface ApiResponse {
  success: boolean;
  message: string;
  psdata: ProgramSession[];
}

export interface ProgramSession {
  id_program: number;
  title: string;
  rest_day: boolean;
  warmup: string;
  date: string;
  position: number;
  notes: string;
  cooldown: string;
  id_workout_category: string;
  date_add: string;
  date_upd: string;
  exercises: IExercise[];
  workout_items: WorkoutItem[];
  id: number;
  force_id: boolean;
}

export interface Exercise {
  id: number;
  name: string;
  video: string;
  type_mark: string | null;
  active_in_marks: string;
  active: string;
  date_add: string;
  date_upd: string;
  force_id: boolean;
}

export interface WorkoutItem {
  id_workout: number;
  notes: string;
  id_program: number;
  name: string;
  info: string;
  is_circuit: boolean;
  position: number;
  date_add: string;
  date_upd: string;
  id_exercise_selected: number;
  id_thetraktor_type_mark: number;
  id_workout_category: number;
  exercises: Exercise[];
  is_ranking: boolean;
  min_result: string;
  id: number;
  force_id: boolean;
  mark?: Mark;
}

export interface Mark {
  id_thetraktor_type_mark: string;
  name: string;
  date_add: string;
  date_upd: string;
  id: number;
  force_id: boolean;
}

// Add more interfaces as needed for your application

export interface IExercise {
    id: number;
    id_thetraktor_excercise: string;
    name: string;
    active: string;
    active_in_marks: string;
    date_add: string;
    date_upd: string;
    type_mark: string;
    video?: string;
  }