import { Day as DayProps } from "../../interfaces/calendarTypes"
import DayEmpty from "./components/DayEmpty"
import DayLoading from "./components/DayLoading"
import DayTopRow from "./components/DayTopRow"
import "./styles.css"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import Workout from "./components/Workout"
import RestDay from "../RestDay"

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
  onDeleteWorkout
}: Props) => {
  const workout = data?.filter(
    (workout: IWorkout) => workout.date === day.date
  )

  const name = `${day.dayName} ${day.dayNumber}`

  if (loading) {
    return <DayLoading />
  }

  if (workout?.length > 0) {



    return (
      <div
        className={`day js--is-day week-day ${
          workout.find((w) => Number(w.id) === Number(isEditing)) && "is-active"
        }  is-small`}
        data-test="week-day"
      >
        <DayTopRow name={name} />
        {workout.map((workout: IWorkout) => (
          workout.rest_day ? <RestDay 
          isEditing={Number(workout.id) === Number(isEditing)}
          onClick={()=> setIsEditing(Number(workout.id), false)} data={workout} 
          onDelete={()=> onDeleteWorkout([workout.id])  }

          />:
          <Workout
            truncate={truncate}
            onSave={saveWorkout}
            key={workout.id}
            isEditing={Number(workout.id) === Number(isEditing)}
            onClick={() => setIsEditing(Number(workout.id), false)}
            onCanceled={() => setIsEditing(null, true)}
            data={workout}
            typesMark={typesMark}
            categories={categories}
            onDelete={()=> onDeleteWorkout([workout.id])  }
          />
        ))}
      </div>
    )
  }
  return (
    <DayEmpty createRestDay={()=> createRestDay(day.date)} name={name} onCreateWorkout={() => onCreateWorkout(day.date)} />
  )
}

export default Day
