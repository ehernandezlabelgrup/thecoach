import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import { CalendarNav } from "./components/CalendarNav/CalendarNav"
import WeeksLabels from "./components/WeeksLabels"
import { createWeeks } from "./utils/calendar"
import { Week } from "./interfaces/calendarTypes"
import { ToastContainer } from "react-toastify"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import dayjs from "dayjs"
import { ICategories, ITypesMark, IWorkout } from "./interfaces/workout"

interface IProps {
  id: number
  URL_BASE: string
}

const App = ({ id, URL_BASE }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<Week[]>([])
  const [truncate, setTruncate] = useState<boolean>(false)

  const [workouts, setWorkouts] = useState<IWorkout[]>([])

  const [typesMark, setTypesMark] = useState<ITypesMark[]>([])
  const [categories, setCategories] = useState<ICategories[]>([])

  const getData = async () => {
    setLoading(true)
    setWorkouts([])
    const date_start = dayjs(date).startOf("month").format("YYYY-MM-DD")
    const date_end = dayjs(date).endOf("month").format("YYYY-MM-DD")
    const response = await axios.get(
      `${URL_BASE}/module/thetraktor/program?id_program=${id}&action=workouts&date_start=` +
        date_start +
        "&date_end=" +
        date_end,
    )
    if (response.data && response.status === 200) {
      setWorkouts(response.data?.psdata)
    }

    setLoading(false)
  }

  const getProgramInfo = async () => {
    const response = await axios.get(
      `${URL_BASE}/module/thetraktor/program?id_program=${id}&action=info`,
    )

    if (response.data && response.status === 200) {
      const { psdata } = response.data
      setTypesMark(psdata.types_mark as ITypesMark[])
      setCategories(psdata.workout_categories as ICategories[])
    }
  }
  useEffect(() => {
    getProgramInfo()
  }, [])

  useEffect(() => {
    if (date) {
      setWeeks(createWeeks(date as Date) as Week[])
      getData()
    }
  }, [date])

  return (
    <div className="app container trainerFrame has-trackableTable grow-1 h-full w-full relative ">
      <ToastContainer position="top-center" />
      <div className="flex trainerFrame-wrap absolute h-full w-full top-0 right-0 ">
        <div className="has-calendar trainerFrame-main ember-view">
          <CalendarNav
            setTruncate={setTruncate}
            setDate={setDate}
            date={date}
            loading={loading}
            truncate={truncate}
          />
          <div className="trainerFrame-calendarWrap  is-small">
            <WeeksLabels />
            <Calendar
              getData={getData}
              URL_BASE={URL_BASE}
              typesMark={typesMark}
              categories={categories}
              loadingGeneral={loading}
              truncate={truncate}
              data={workouts}
              weeks={weeks}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
