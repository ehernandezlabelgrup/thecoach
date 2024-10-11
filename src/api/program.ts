/**
 * @file program.ts
 * @description API functions for program-related operations
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import axios from 'axios';
import { IProgramResponse } from '../interfaces/response';

/**
 * Fetch program data from the API
 * @param {string} base_url - The base URL for the API
 * @param {string} id_program - The ID of the program
 * @param {string} startDate - The start date for the data range
 * @param {string} endDate - The end date for the data range
 * @returns {Promise<any>} The program data
 */
export const fetchProgramData = async (
  base_url: string, 
  id_program: string, 
  startDate: string, 
  endDate: string
): Promise<IProgramResponse> => {
  try {
    const response = await axios.get(
      `${base_url}/module/thetraktor/program`, 
      {
        params: {
          id_program,
          action: 'workouts',
          date_start: startDate,
          date_end: endDate
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching program data:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// TODO: Add more API functions as needed (e.g., createRestDay, createNewDay)