//
/**
 * @file CalendarContext.tsx
 * @description Context provider for advanced calendar application with state management and API integration
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import dayjs from "dayjs";

// Types
import {
  CalendarContextType,
  CalendarProviderProps,
} from "../../interfaces/calendar";

// Utils
import { setCookie, getCookie } from "../../utils/cookies";
import { getDateRange } from "../../utils/dateUtils";

// API
import { fetchProgramData } from "../../api/program";

// Constants
import { COOKIE_NAMES } from "../../constants";

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

/**
 * CalendarProvider component
 * Manages the state and provides calendar-related functionality to its children
 */
export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  id_program,
  base_url,
}) => {
  // State
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [truncate, setTruncate] = useState(() => {
    const savedTruncate = getCookie(COOKIE_NAMES.CALENDAR_TRUNCATE);
    return savedTruncate === "true";
  });
  const [programData, setProgramData] = useState(null);

  // Effects
  useEffect(() => {
    setCookie(COOKIE_NAMES.CALENDAR_TRUNCATE, truncate.toString(), 30);
  }, [truncate]);

  useEffect(() => {
    if (id_program && currentDate && base_url) {
      getProgramData();
    }
  }, [id_program, currentDate, base_url]);

  // Callbacks
  const getProgramData = useCallback(async () => {
    try {
      setLoading(true);
      const { startDate, endDate } = getDateRange(currentDate);
      const { success, psdata } = await fetchProgramData(
        base_url,
        id_program,
        startDate,
        endDate
      );
      if (success && psdata) {
        setProgramData(psdata);
      }
    } catch (error) {
      console.error("Failed to fetch program data:", error);
      // TODO: Implement proper error handling
    } finally {
      setLoading(false);
    }
  }, [currentDate, base_url, id_program]);

  const createRestDay = useCallback(
    async (date: string) => {
      try {
        setLoading(true);
        // TODO: Implement REST day creation logic
        console.log("Creating rest day:", date);
        // After creation, refresh program data
        await getProgramData();
      } catch (error) {
        console.error("Failed to create rest day:", error);
        // TODO: Implement proper error handling
      } finally {
        setLoading(false);
      }
    },
    [getProgramData]
  );

  const createNewDay = useCallback(
    async (date: string) => {
      try {
        setLoading(true);
        // TODO: Implement new day creation logic
        console.log("Creating new day:", date);
        // After creation, refresh program data
        await getProgramData();
      } catch (error) {
        console.error("Failed to create new day:", error);
        // TODO: Implement proper error handling
      } finally {
        setLoading(false);
      }
    },
    [getProgramData]
  );
  console.log(programData);
  // Context value
  const contextValue: CalendarContextType = {
    currentDate,
    setCurrentDate,
    truncate,
    setTruncate,
    createRestDay,
    createNewDay,
    loading,
    programData,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {loading && (
        <div className="bg-black absolute left-0 top-0 h-full w-full z-40 bg-opacity-20" />
      )}
      {children}
    </CalendarContext.Provider>
  );
};

/**
 * Custom hook to use the CalendarContext
 * @throws {Error} If used outside of a CalendarProvider
 */
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
