import React, { useState, useCallback } from "react";
import AsyncSelect from "react-select/async";
import CameraIcon from "../Icons/CameraIcon";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";
import debounce from "lodash/debounce";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IExercise } from "../../interfaces";

interface Exercise {
  id_thetraktor_excercise: string;
  name: string;
  video?: string;
}

interface Option {
  value: string;
  label: string;
}

const VideoAdd: React.FC<{ data?: IExercise[]; enable: boolean }> = ({
  data = [],
  enable,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const { getExcercises, truncate } = useCalendar();

  const [list, setList] = useState<Exercise[]>(data);

  const loadOptions = useCallback(
    debounce(async (inputValue: string) => {
      if (inputValue.length < 2) {
        return [];
      }
      try {
        const result = await getExcercises(inputValue);

        // Check if result is an array of Exercise objects
        if (
          Array.isArray(result) &&
          result.every(
            (item) => "id_thetraktor_excercise" in item && "name" in item
          )
        ) {
          return result.map((exercise: Exercise) => ({
            value: exercise.id_thetraktor_excercise,
            label: exercise.name,
          }));
        }
        // If result is not an array of Exercise objects, log an error and return an empty array
        else {
          console.error("Unexpected result format from getExcercises:", result);
          return [];
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
      }
    }, 300),
    []
  );

  const handleChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      const newExercise = {
        id_thetraktor_excercise: selectedOption.value,
        name: selectedOption.label,
      };
      setList((prevList) => [...prevList, newExercise]);
    }
  };

  if (truncate && !enable) {
    return null;
  }

  return (
    <div>
      {enable && (
        <div className="px-2 flex flex-row items-center">
          <div className="flex-1">
            <AsyncSelect
              value={selectedOption}
              onChange={handleChange}
              loadOptions={loadOptions}
              placeholder="Añadir ejercicio"
              noOptionsMessage={({ inputValue }) => {
                if (inputValue.length < 2) {
                  return "Escribe al menos 2 caracteres";
                } else {
                  return "No se encontraron resultados";
                }
              }}
              loadingMessage={() => "Cargando..."}
              className="react-select-container text-xs bg-transparent"
              classNamePrefix="react-select"
              classNames={{
                control: () =>
                  "react-select__control !z-50 !min-h-[30px] !h-[30px] !shadow-none !outline-none !bg-transparent !border-transparent !border-none",
                indicatorsContainer: () => "!hidden",
                menu: () => "!z-20",
              }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-2 px-2">
        {list.map((exercise, index) => (
          <Popover key={index}>
            <PopoverTrigger>
              <div className="flex flex-row bg-gray-200 items-center px-2 gap-2 text-xs rounded-full cursor-pointer">
                <CameraIcon className="w-4 h-4 mr-2" />
                <span>{exercise.name}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {exercise.video ? (
                <video width="300" controls>
                  <source src={exercise.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>No hay video disponible para este ejercicio.</p>
              )}
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default VideoAdd;
