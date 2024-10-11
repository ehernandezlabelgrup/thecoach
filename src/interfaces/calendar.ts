/**
 * @file calendar.ts
 * @description Type definitions for the calendar application
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import { ReactNode } from 'react';
import { ProgramSession } from '.';

export interface CalendarContextType {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  truncate: boolean;
  setTruncate: (truncate: boolean) => void;
  createRestDay: (date: string) => Promise<void>;
  createNewDay: (date: string) => Promise<void>;
  loading: boolean;
  programData: ProgramSession[] | null;
  activeDay: IActiveDay | null;
  activeDayHandler: (date: IActiveDay | null) => void;
  deleteWorkout: (id: number) => void;
  getExcercises: (text:string) => void;
}

export interface IActiveDay {
    date: string;
    id_workout: number;
}

export interface CalendarProviderProps {
  children: ReactNode;
  id_program: string;
  base_url: string;
}

// TODO: Add more interfaces as needed for your application