import { Day as DayProps } from "../../interfaces/calendarTypes";
import DayEmpty from "./components/DayEmpty";
import DayLoading from "./components/DayLoading";
import DayTopRow from "./components/DayTopRow";
import "./styles.css";
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout";
import Workout from "./components/Workout";
import RestDay from "../RestDay";
import { Droppable } from "react-beautiful-dnd";
import { useRef, useState } from "react";
import Audio from "../Audio";

interface Props {
  loading: boolean;
  day: DayProps;
  data: IWorkout[];
  truncate: boolean;
  onCreateWorkout: (date: string) => void;
  isEditing: number | null;
  setIsEditing: (id: number | null, isEditing: boolean) => void;
  saveWorkout: (workout: IWorkout) => void;
  typesMark: ITypesMark;
  categories: ICategories;
  createRestDay: (date: string) => void;
  onDeleteWorkout: (id: number[]) => void;
}
const Day = ({
  loading,
  day,
  data,
  truncate,
  onCreateWorkout,
  isEditing,
  setIsEditing,
  saveWorkout,
  typesMark,
  categories,
  createRestDay,
  onDeleteWorkout,
  onUploadAudio,
  audios,
  onCoyWorkout,
  onSelect, 
  selecteds,
  pasteWorkout
}: Props) => {
  const workout = data?.filter(
    (workout: IWorkout) => workout.date === day.date
  );

  const name = `${day.dayName} ${day.dayNumber}`;

  if (loading) {
    return <DayLoading />;
  }

  const audio = audios.find((audio) => audio.date === day.date);

  return (
    <div
      className={`day js--is-day week-day ${
        workout.find((w) => Number(w.id) === Number(isEditing)) && "is-active"
      }  is-small`}
      data-test="week-day"
    >
      <DayTopRow 
      pasteWorkout={pasteWorkout}
      audio={audio}
      onUploadAudio={onUploadAudio} name={name} date={day.date} />
     
      <Droppable droppableId={day.date} type="workout">
        {(provided) => (
          <div
            className="program-calendar-day-workouts"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {workout.length > 0 ? (
              workout.map((workout: IWorkout, index) =>
                workout.rest_day ? (
                  <RestDay
                  onSelect={() => onSelect(workout?.id)}
                  selected = {selecteds.includes(workout?.id)}
                    isEditing={Number(workout.id) === Number(isEditing)}
                    onClick={() => setIsEditing(Number(workout.id), false)}
                    data={workout}
                    onDelete={() => onDeleteWorkout([workout.id])}
                    index={index}
                    key={workout.id}
                    onCoyWorkout={onCoyWorkout}
                  />
                ) : (
                  <Workout
                  onSelect={() => onSelect(workout?.id)}
                  selected = {selecteds.includes(workout?.id)}

                  onCoyWorkout={onCoyWorkout}
                    index={index}
                    truncate={truncate}
                    onSave={saveWorkout}
                    key={workout.id}
                    isEditing={Number(workout.id) === Number(isEditing)}
                    onClick={() => setIsEditing(Number(workout.id), false)}
                    onCanceled={() => setIsEditing(null, true)}
                    data={workout}
                    typesMark={typesMark}
                    categories={categories}
                    onDelete={() => onDeleteWorkout([workout.id])}
                  />
                )
              )
            ) : (
              <DayEmpty
                createRestDay={() => createRestDay(day.date)}
                name={name}
                onCreateWorkout={() => onCreateWorkout(day.date)}
              />
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

};

export default Day;
