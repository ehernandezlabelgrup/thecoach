import { useEffect, useState } from "react"
import { Week as Weeks } from "../../interfaces/calendarTypes"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import Week from "../Week"
import "./styles.css"
import { toast } from "react-toastify"
import { createNewWorkout } from "../../utils/calendar"
import axios from "axios"

interface Props {
  weeks: Weeks[];
  data: IWorkout[];
  truncate: boolean;
  categories: ICategories;
  typesMark: ITypesMark;
}

const Calendar = ({ weeks, data, truncate, categories, typesMark, URL_BASE, getData }: Props) => {
  const [workouts, setWorkouts] = useState<IWorkout[]>(data)
  const [isEditing, setIsEditing] = useState<number | null>(null)

  const onChangeWorkout = (workout: IWorkout) => {
    const newData = workouts.map((item: IWorkout) => {
      if (item.id === workout.id) {
        return workout
      }
      return item
    })
    toast("Wow so easy !")

    setWorkouts(newData)
  }

  const onEditing = (id: number | null, cancel = false) => {
    if (cancel) {
      /**
       * Si cancelamos la edicion, eliminamos el workout
       * con id -1
       * @author ehernandez
       */
      const newData = workouts.filter((item) => item.id !== -1)
      setWorkouts(newData)
      return setIsEditing(null)
    }

    if (id) {
      return setIsEditing(id)
    }
  }

  const onCreateWorkout = (date: string) => {
    const data = createNewWorkout(date, workouts)
    setWorkouts(data as IWorkout[])
    setIsEditing(-1)
  }

  const saveWorkout = async (workout: IWorkout) => {

    if(Number(workout.id) < 0){
     workout.id = 0
    }

    const items = workout?.workout_items?.map((item) => {
      if(!item.id_workout_category){
        item.id_workout_category = 0
      }


      return item
    })
console.log(workout)
    workout.workout_items = items
    const { data, status } = await axios.post(
      `${URL_BASE}/module/thetraktor/program?action=workouts&id_program=1`,
      {
        ...workout,
      }
    )
    if (status === 200) {
      if (data?.success) {
        const { psdata } = data
        toast.success("Entrenamiento guardado")
        setIsEditing(null)
        if(workout.id){
          onChangeWorkout(psdata)
        }else{
          setWorkouts([...workouts, psdata])
        }
      } else {
        toast.error(data?.error)
      }
    }
  }

  const createRestDay = async (date: string) => {
    const { data, status } = await axios.post(
      `${URL_BASE}/module/thetraktor/program?action=restday&id_program=1`,
      {
        date: date,
      }
    )
    if (status === 200) {
      if (data?.success) {
        toast.success("Rest day created")
        setWorkouts([...workouts, data?.psdata])
      } else {
        toast.error(data?.error)
      }
    }
  }

  const onDeleteWorkout = async (ids: number[]) => {
    const idsConverted = ids.map((id) => `ids[]=${id}`).join("&")
    const { data, status } = await axios.delete(
      `${URL_BASE}/module/thetraktor/program?action=workouts&id_program=1&${idsConverted}`,
    )
      await getData()
    if (status === 200) {
      if (data?.success) {
        toast.success("Entrenamiento eliminado")
        return true
      } else {
        toast.error(data?.error)
        return false
      }
    }
  }

  useEffect(() => {
    setWorkouts(data)
  }, [data])
  console.log(data, '....')
  return (
    <div className="calendar font-proximanova js--calendar  trainerFrame-calendar">
      {weeks.map((week, index) => (
        <Week
          truncate={truncate}
          onChangeWorkout={onChangeWorkout}
          onCreateWorkout={onCreateWorkout}
          data={workouts}
          key={index}
          setIsEditing={setIsEditing}
          onEditing={onEditing}
          isEditing={isEditing}
          week={week}
          saveWorkout={saveWorkout}
          typesMark={typesMark}
          categories={categories}
          createRestDay={createRestDay}
          onDeleteWorkout={onDeleteWorkout}
        />
      ))}
    </div>
  )
}

export default Calendar
