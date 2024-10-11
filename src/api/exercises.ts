/**
 * @file program.ts
 * @description API functions for program-related operations
 * @author Emilio Hernandez <ehernandez@okoiagency.com>
 * @copyright OKOI APP DEVELOPMENT S.L.
 */

import axios from 'axios';
import { IExcersiceResponse } from '../interfaces/response';




/**
 * Fetch exercise suggestions from the API
 * @param {string} base_url - The base URL for the API
 * @param {number} perPage - Number of results per page
 * @param {string} text - The search text for exercises
 * @returns {Promise<IExcersiceResponse>} The exercise suggestions data
 */
export const fetchExerciseSuggestions = async (
  base_url: string, 
  perPage: number, 
  text: string
): Promise<IExcersiceResponse> => {
  try {
    const response = await axios.get<IExcersiceResponse>(
      `${base_url}/module/thetraktor/getallexercises`, 
      {
        params: {
          name: text,
          per_page: perPage
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching exercise suggestions:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// You can add more API functions here as needed