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
import Toastify from "toastify-js";

// Types
import {
  CalendarContextType,
  CalendarProviderProps,
  IActiveDay,
} from "../../interfaces/calendar";

// Utils
import { setCookie, getCookie } from "../../utils/cookies";
import { getDateRange } from "../../utils/dateUtils";

// API
import { fetchProgramData } from "../../api/program";

// Constants
import { COOKIE_NAMES, COPIED_WORKOUTS_KEY } from "../../constants";
import { fetchExerciseSuggestions } from "../../api/exercises";
import useMutation from "../../hooks/useMutation";
import { Checkbox } from "@nextui-org/react";
import CopyIcon from "../../components/Icons/CopyIcon/PasteIcon";
import TrashIcon from "../../components/Icons/TrashIcon";
import Modal from "../../components/Modal";

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
  const [activeDay, setActiveDay] = useState<IActiveDay | null>(null);
  const [copiedWorkout, setCopiedWorkout] = useState<number[]>([]);

  const [mutate] = useMutation(base_url);

  const [truncate, setTruncate] = useState(() => {
    const savedTruncate = getCookie(COOKIE_NAMES.CALENDAR_TRUNCATE);
    return savedTruncate === "true";
  });
  const [programData, setProgramData] = useState([]);

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

  const deleteWorkout = (id_workout: number) => {
    setActiveDay(null);
    console.log("Deleting workout item:", id_workout);
  };

  const activeDayHandler = (date: IActiveDay) => {
    if (date && activeDay) {
      Toastify({
        text: "Guarde o cancela el día activo actual antes de seleccionar otro",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
      }).showToast();
      return null;
    }
    setActiveDay(date);
  };

  const getExcercises = async (value: string) => {
    const { psdata, success } = await fetchExerciseSuggestions(
      base_url,
      40,
      value
    );
    if (success && psdata) {
      return psdata;
    }
  };
  const onSelectworkout = (id: number) => {
    setCopiedWorkout((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Si el ID ya está en el array, lo removemos
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        // Si el ID no está en el array, lo añadimos
        return [...prevSelected, id];
      }
    });
  };

  const clearSelected = () => {
    setCopiedWorkout([]);
  };

  const onCopyWorkouts = () => {
    if (copiedWorkout.length === 0) {
      Toastify({
        text: "No hay workouts seleccionados para copiar",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
      return;
    }
    localStorage.setItem(COPIED_WORKOUTS_KEY, JSON.stringify(copiedWorkout));
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, preparar los datos para pegarlos en otro lugar

    Toastify({
      text: `${copiedWorkout.length} workout(s) copiados`,
      duration: 3000,
      gravity: "top",
      position: "center",
    }).showToast();
  };

  const onDeleteSelectedWorkouts = () => {
    setCopiedWorkout([]);
    Toastify({
      text: `${copiedWorkout.length} workout(s) eliminados`,
      duration: 3000,
      gravity: "top",
      position: "center",
    }).showToast();
  };

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
    activeDay,
    activeDayHandler,
    deleteWorkout,
    getExcercises,
    onSelectworkout,
    copiedWorkout,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {loading && (
        <div className="bg-black absolute left-0 top-0 h-full w-full z-40 bg-opacity-20" />
      )}
      {children}
      {copiedWorkout?.length > 0 && (
        <div className="h-14 sticky z-10 bottom-0 items-center flex flex-row justify-between px-2 w-full bg-white border-t border-gray-300 shadow">
          <div className="flex flex-1 flex-row gap-2">
            <Checkbox>
              <div className="font-bold uppercase text-xs flex items-center flex-row gap-1">
                <span className="bg-blue-500 text-center text-white block min-w-4 min-h-4 rounded-none">
                  {copiedWorkout.length}
                </span>{" "}
                Copiados
              </div>
            </Checkbox>
            <button onClick={clearSelected} className="text-xs underline">
              Eliminar selección
            </button>
          </div>
          <div className="flex flex-1 flex-row justify-center gap-2">
            <button onClick={onCopyWorkouts} className="text-slate-500 p-2">
              <CopyIcon className="w-4" />
            </button>
            <Modal
              textAccept="Eliminar"
              onAccept={onDeleteSelectedWorkouts}
              button={
                <button className="text-red-500 p-2">
                  <TrashIcon className="w-4" />
                </button>
              }
            >
              <p>¿Esta seguro que desea eliminar estos workouts?</p>
            </Modal>
          </div>
          <div className="flex-1"></div>
        </div>
      )}
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
