import { Day as DayProps } from "../../interfaces/calendarTypes"
import DayEmpty from "./components/DayEmpty"
import DayLoading from "./components/DayLoading"
import DayTopRow from "./components/DayTopRow"
import './styles.css'
import { Workout as WorkoutProps } from "../../interfaces/workout"
import Workout from "./components/Workout"
import { useState } from "react"


interface Props {
  loading: boolean
  day: DayProps
  data: WorkoutProps[]
  onChangeWorkout: (workout: WorkoutProps) => void
  truncate: boolean
}
const Day = ({ loading, day, data, onChangeWorkout, truncate }: Props) => {

  const [isEditing, setIsEditing] = useState(0)
  const workout = data.filter((workout: WorkoutProps) => workout.date === day.date)
  const name = `${day.dayName} ${day.dayNumber}`

  const onSave = (workout: WorkoutProps) => {
    workout.id = Number(workout.id)
    onChangeWorkout(workout)
    setIsEditing(0)
  }

  if (loading) {
    return <DayLoading />
  }

  if (workout) {
    return <div className={`day js--is-day week-day ${isEditing && 'is-active'}  is-small`} data-test="week-day">
      <DayTopRow name={name} />
      {
        workout.map((workout: WorkoutProps) => (
          <Workout
          truncate={truncate}
          onSave={onSave}
          key={workout.id}
          isEditing={workout.id === isEditing}
          onClick={() => setIsEditing(workout.id)}
          onCanceled={() => setIsEditing(0)}
          data={workout} />
        ))
      }
    </div>
  }
  return <DayEmpty name={name} />
}

export default Day
