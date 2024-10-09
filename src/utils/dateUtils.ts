/**
 * @file dateUtils.ts
 * @description Utility functions for date operations
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import dayjs from 'dayjs';

/**
 * Get the start and end dates for the calendar view
 * @param {string} currentDate - The current date in 'YYYY-MM-DD' format
 * @returns {{ startDate: string, endDate: string }} The start and end dates in 'YYYY-MM-DD' format
 */
export const getDateRange = (currentDate: string): { startDate: string, endDate: string } => {
  const currentMonth = dayjs(currentDate);
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  
  // Adjust to the start of the week of the first day of the month
  const startDate = startOfMonth.startOf('week');
  
  // Adjust to the end of the week of the last day of the month
  const endDate = endOfMonth.endOf('week');

  return {
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD')
  };
};

// TODO: Add more date utility functions as needed