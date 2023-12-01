import { Week as WeekProps } from '../../interfaces/calendarTypes'
import { Workout } from '../../interfaces/workout'
import Day from '../Day'

interface Props{
  week:WeekProps
  data: Workout[]
  truncate: boolean
  onChangeWorkout: (workout: Workout) => void
}

const Week = ({week, data, onChangeWorkout , truncate}: Props) => {

  return (
    <div className="week " id={`week-${week.id}`}>
    <div className="week-days" data-test="week-days">
        {week.days.map((day) => (
          <Day 
          truncate={truncate}
          onChangeWorkout={onChangeWorkout}
          data={data} loading={false} key={day.id} day={day} />
        ))}
    </div>
  </div>
  )
}

export default Week