import CalendarDayActions from "../../../CalendarDayActions"
import DayTopRow from "../DayTopRow"

interface Props {
  name: string;
  createRestDay: () => void;
  onCreateWorkout: () => void;
}
const DayEmpty = ({ name, onCreateWorkout, createRestDay }: Props) => {
  return (
    <div
      className="day js--is-day week-day is-empty is-future is-small"
      data-test="week-day"
      data-test-date="2023-12-10"
    >
      <DayTopRow name={name} />
      <div
        id="ember311"
        className="flex flex-col flex-grow sortable-objects ember-view"
      >
        <div
          id="ember312"
          className="day-target draggable-object-target ember-view"
        >
          <CalendarDayActions createRestDay={createRestDay} onCreateWorkout={onCreateWorkout} />
        </div>
      </div>
    </div>
  )
}

export default DayEmpty
