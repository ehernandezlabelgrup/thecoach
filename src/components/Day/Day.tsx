import { Day as DayProps } from "../../interfaces/calendarTypes"
import DayEmpty from "./components/DayEmpty"
import DayLoading from "./components/DayLoading"
import DayTopRow from "./components/DayTopRow"
import "./styles.css"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import Workout from "./components/Workout"
import RestDay from "../RestDay"
import { Droppable } from "react-beautiful-dnd"
import { useMemo } from "react"
import { IAudio } from "../Audio/Audio"

interface Props {
  loading: boolean
  day: DayProps
  data: IWorkout[]
  onCreateWorkout: (date: string) => void
  isEditing: number | null
  setIsEditing: (id: number | null, isEditing: boolean) => void
  saveWorkout: (workout: IWorkout) => void
  typesMark: ITypesMark[]
  categories: ICategories[]
  createRestDay: (date: string) => void
  onDeleteWorkout: (id: number[]) => void
  onUploadAudio: (date: string, file: File) => void
  audios: IAudio[] | undefined
  onCoyWorkout: (id: number) => void
  onSelect: (id: number) => void
  selecteds: number[]
  pasteWorkout: (date: string) => void
  URL_BASE: string
  setSelectAudio: (audio: IAudio) => void
}
const Day = ({
  loading,
  day,
  data,
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
  pasteWorkout,
  URL_BASE,
  setSelectAudio,
}: Props) => {
  const workout = useMemo(() => {
    return data
      ?.filter((workout: IWorkout) => workout.date === day.date)
      .sort((a, b) => a.position - b.position)
  }, [data])

  const name = `${day.dayName} ${day.dayNumber}`

  if (loading) {
    return <DayLoading />
  }

  const audio = audios?.find((audio) => audio.date === day.date)

  return (
    <div
      className={`day js--is-day week-day ${
        workout.find((w) => Number(w.id) === Number(isEditing)) && "is-active"
      }  is-small`}
      data-test="week-day"
      id={`day-${day.date}`}
    >
      <DayTopRow
        pasteWorkout={pasteWorkout}
        audio={audio}
        onUploadAudio={onUploadAudio}
        name={name}
        date={day.date}
        setSelectAudio={setSelectAudio}
        onCreateWorkout={() => onCreateWorkout(day.date)}
      />

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
                    selected={selecteds.includes(workout?.id)}
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
                    URL_BASE={URL_BASE}
                    onSelect={() => onSelect(workout?.id)}
                    selected={selecteds.includes(workout?.id)}
                    onCoyWorkout={onCoyWorkout}
                    index={index}
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
                ),
              )
            ) : (
              <DayEmpty
                date={day.date}
                createRestDay={() => createRestDay(day.date)}
                onCreateWorkout={() => onCreateWorkout(day.date)}
              />
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Day
