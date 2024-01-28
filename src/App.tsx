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

const App = ({ id, URL_BASE }) => {
  const [loading] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<Week[]>([])
  const [truncate, setTruncate] = useState<boolean>(false)

  const [workouts, setWorkouts] = useState<any[]>([])

  const [typesMark, setTypesMark] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const getData = async () => {
    const date_start = dayjs(date).startOf("month").format("YYYY-MM-DD")
    const date_end = dayjs(date).endOf("month").format("YYYY-MM-DD")
    const response = await axios.get(
      `${URL_BASE}/module/thetraktor/program?id_program=${id}&action=workouts&date_start=` +
        date_start +
        "&date_end=" +
        date_end
    )

    if (response.data && response.status === 200) {
      setWorkouts(response.data?.psdata)
    }
  }

  const getProgramInfo = async () => {
    const response = await axios.get(
      `${URL_BASE}/module/thetraktor/program?id_program=${id}&action=info`
    )

    if (response.data && response.status === 200) {
      const {psdata} = response.data
      setTypesMark(psdata.types_mark)
      setCategories(psdata.workout_categories)
    }
  }
  useEffect(() => {
    setWeeks(createWeeks(date as Date) as Week[])
    getProgramInfo()
  }, [])

  useEffect(() => {
    if (date) getData()
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
            truncate={truncate} data={workouts} weeks={weeks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
