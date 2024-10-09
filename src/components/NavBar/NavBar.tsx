/**
 * @file NavBar.tsx
 * @description Navigation bar component for calendar application with date selection and truncate option
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ForwardIcon from "../Icons/ForwardIcon";
import BackIcon from "../Icons/BackIcon";
import CaretDownIcon from "../Icons/CaretDownIcon";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";

// Set Spanish locale for dayjs
dayjs.locale("es");

interface NavBarProps {
  loading?: boolean;
}

/**
 * NavBar component for calendar navigation
 * @param {NavBarProps} props - Component props
 * @returns {React.ReactElement} Rendered NavBar component
 */
export const NavBar: React.FC<NavBarProps> = ({ loading = false }): React.ReactElement => {
  const { truncate, setTruncate, currentDate, setCurrentDate } = useCalendar();
  const [currentMonth, setCurrentMonth] = useState<string>(() => 
    dayjs(currentDate).format("MMMM YYYY")
  );

  /**
   * Handles date changes based on user actions
   * @param {("today" | "back" | "next")} type - Type of date change
   */
  const handleDateChange = useCallback((type: "today" | "back" | "next") => {
    let newDate: Date;
    switch (type) {
      case "today":
        newDate = dayjs().startOf('day').toDate();
        break;
      case "back":
        newDate = dayjs(currentDate).subtract(1, "month").startOf('day').toDate();
        break;
      case "next":
        newDate = dayjs(currentDate).add(1, "month").startOf('day').toDate();
        break;
      default:
        return;
    }
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  // Update current month display when currentDate changes
  useEffect(() => {
    setCurrentMonth(dayjs(currentDate).format("MMMM YYYY"));
  }, [currentDate]);

  return (
    <nav
      className={`flex justify-between items-center pb-2 ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative flex h-[35px]">
          <button
            onClick={() => handleDateChange("today")}
            className="px-6 py-2 font-hongkong border-l border border-gray-300 text-sm"
          >
            Hoy
          </button>
          <div className="relative">
            <DatePicker
              onChange={(date) => date && setCurrentDate(dayjs(date).startOf('day').toDate())}
              selected={currentDate}
              customInput={
                <button className="px-2 py-2 h-[35px] border border-l-0 border-gray-300 rounded-r">
                  <CaretDownIcon />
                </button>
              }
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleDateChange("back")}
            className="p-2"
            data-test="back-month-button"
            aria-label="Previous month"
          >
            <BackIcon />
          </button>
          <button
            onClick={() => handleDateChange("next")}
            className="p-2"
            data-test="forward-month-button"
            aria-label="Next month"
          >
            <ForwardIcon />
          </button>
        </div>
        <div className="text-[24px] font-hongkong capitalize">
          {currentMonth}
        </div>
      </div>
      <div>
        <label className="inline-flex font-hongkong items-center cursor-pointer">
          <input
            checked={truncate}
            onChange={(e) => setTruncate(e.target.checked)}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Truncate
          </span>
        </label>
      </div>
    </nav>
  );
};

export default NavBar;