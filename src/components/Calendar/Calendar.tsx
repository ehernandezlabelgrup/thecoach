import { useState } from 'react'
import { Week as Weeks } from '../../interfaces/calendarTypes'
import { Workout } from '../../interfaces/workout'
import Week from '../Week'
import './styles.css'
import { toast } from 'react-toastify'


interface Props{
  weeks: Weeks[]
  data: Workout[]
  truncate: boolean
}

const Calendar = ({weeks, data, truncate}: Props) => {
  const [workouts, setWorkouts] = useState<Workout[]>(data)

  const onChangeWorkout = (workout: Workout) => {
  
    const newData = workouts.map((item: Workout) => {
      if(item.id === workout.id){
        return workout
      }
      return item
    }
    )
   toast("Wow so easy !")

    setWorkouts(newData)
  }



  return (
    <div className="calendar font-proximanova js--calendar  trainerFrame-calendar">
        {weeks.map((week) => (
          <Week 
          truncate={truncate}
          onChangeWorkout={onChangeWorkout}
          data={workouts} key={week.id} week={week} />
        ))}
  </div>
  )
}

export default Calendar