/**
 * @file CalendarContext.tsx
 * @description Context provider for calendar application with truncate state persistence
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import dayjs from 'dayjs';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  truncate: boolean;
  setTruncate: (truncate: boolean) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

/**
 * Sets a cookie with the given name and value
 * @param {string} name - The name of the cookie
 * @param {string} value - The value to store in the cookie
 * @param {number} days - The number of days until the cookie expires
 */
const setCookie = (name: string, value: string, days: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Gets the value of a cookie by its name
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string | null} The value of the cookie or null if not found
 */
const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const [truncate, setTruncate] = useState(() => {
    const savedTruncate = getCookie('calendar_truncate');
    return savedTruncate === 'true' ? true : false;
  });

  useEffect(() => {
    setCookie('calendar_truncate', truncate.toString(), 30);
  }, [truncate]);

  return (
    <CalendarContext.Provider value={{
      currentDate,
      setCurrentDate,
      truncate,
      setTruncate
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};