import { IExercise, ProgramSession } from ".";

export interface IExcersiceResponse extends IResponse {
    psdata: IExercise[];
    total_exercises: number;
    total_pages: number;
    current_page: number;
  }


  export interface IResponse {
    code: number;
    success: boolean;
  }

  export interface IProgramResponse extends IResponse {
    psdata: ProgramSession[];
  }