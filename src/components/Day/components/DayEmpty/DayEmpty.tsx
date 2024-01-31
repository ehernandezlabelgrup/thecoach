import CalendarDayActions from "../../../CalendarDayActions"

interface Props {
  createRestDay: () => void
  onCreateWorkout: () => void
  date: string
}
const DayEmpty = ({ onCreateWorkout, createRestDay, date }: Props) => {
  return (
    <div
      id="ember311"
      className="flex  h-[200px] opacity-0 hover:opacity-100 flex-col flex-grow sortable-objects is-empty ember-view"
    >
      <div
        id="ember312"
        className="day-target draggable-object-target ember-view"
      >
        <CalendarDayActions
          date={date}
          createRestDay={createRestDay}
          onCreateWorkout={onCreateWorkout}
        />
      </div>
    </div>
  )
}

export default DayEmpty
