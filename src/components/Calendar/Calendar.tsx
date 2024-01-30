import { useEffect, useState } from "react"
import { Week as Weeks } from "../../interfaces/calendarTypes"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import Week from "../Week"
import "./styles.css"
import { toast } from "react-toastify"
import { createNewWorkout } from "../../utils/calendar"
import axios from "axios"
import { DragDropContext } from "react-beautiful-dnd"
import { IAudio } from "../Audio/Audio"

interface IDragContext {
  draggableId: string
  destination?: {
    droppableId: string
    index: number
  }
  type?: string
}
interface Props {
  weeks: Weeks[]
  data: IWorkout[]
  truncate: boolean
  categories: ICategories[]
  typesMark: ITypesMark[]
  URL_BASE: string
  getData: () => void
  loadingGeneral: boolean
}

const Calendar = ({
  weeks,
  data,
  truncate,
  categories,
  typesMark,
  URL_BASE,
  getData,
  loadingGeneral,
}: Props) => {
  const [workouts, setWorkouts] = useState<IWorkout[]>(data)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [audios, setAudios] = useState<IAudio[]>([])

  const onChangeWorkout = (workout: IWorkout) => {
    const newData = workouts.map((item: IWorkout) => {
      if (item.id === workout.id) {
        return workout
      }
      return item
    })

    setWorkouts(newData)
  }

  const [selecteds, setSelected] = useState<number[]>([])

  const onSelect = (id: number) => {
    let newSelecteds = [...selecteds]

    if (newSelecteds.includes(id)) {
      newSelecteds = newSelecteds.filter((item) => item !== id)
    } else {
      newSelecteds.push(id)
    }
    setSelected(newSelecteds)
  }

  const onCoyWorkout = (id: number[] | number, multiple = false) => {
    if (multiple) {
      localStorage.setItem("workouts_id", JSON.stringify(selecteds))
      setSelected([])
      toast.success("Entrenamientos copiados")
    } else {
      localStorage.setItem("workouts_id", JSON.stringify([id]))
    }
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
    if (Number(workout.id) < 0) {
      workout.id = 0
    }

    let countRanking = 0
    let isValid = true

    const items = workout?.workout_items?.map((item) => {
      if (!item.id_workout_category) {
        item.id_workout_category = "0"
      }

      if (Number(item.is_ranking)) {
        countRanking++
      }

      if (Number(item.id_thetraktor_type_mark) === 1) {
        const regex = /^\d{2}:\d{2}$/
        if (!regex.test(item.min_result)) {
          toast.error("El formato de la marca es incorrecto deberia ser NN:NN")
          isValid = false
        }
      } else {
        if (Number(item.min_result) !== 0) {
          if (!Number(item.min_result)) {
            toast.error("La marca debe ser mayor a 0")
            isValid = false
          }
        }
      }

      return item
    })

    if (countRanking > 1) {
      toast.error("Solo puede haber un ejercicio con ranking")
      return
    }

    if (!isValid) {
      return
    }

    workout.workout_items = items
    const { data, status } = await axios.post(
      `${URL_BASE}/module/thetraktor/program?action=workouts&id_program=1`,
      {
        ...workout,
      },
    )
    if (status === 200) {
      if (data?.success) {
        const { psdata } = data
        toast.success("Entrenamiento guardado")
        setIsEditing(null)
        if (workout.id) {
          onChangeWorkout(psdata)
        } else {
          setWorkouts([...workouts, psdata])
        }
      } else {
        toast.error(data?.error)
      }
    }
  }

  const getAudios = async () => {
    const { data, status } = await axios.get(
      `${URL_BASE}/module/thetraktor/program?action=audios&id_program=1`,
    )
    if (status === 200) {
      if (data?.success) {
        setAudios(data?.psdata)
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
      },
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
    setSelected([])
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

  const pasteWorkout = async (date: string) => {
    // eslint-disable-next-line prettier/prettier
    if (localStorage.getItem("workouts_id")) {
      let ids = localStorage.getItem("workouts_id")
      if (!ids) {
        return
      }

      ids = JSON.parse(ids)
      const { data, status } = await axios.post(
        `${URL_BASE}/module/thetraktor/program?action=paste&id_program=1`,
        {
          ids,
          date,
        },
      )
      if (status === 200) {
        if (data?.success) {
          toast.success("Entrenamiento pegado")
          getData()
        } else {
          toast.error(data?.error)
        }
      }
    }
  }

  const onMoveWorkout = async (movable: IDragContext) => {
    if (!movable.destination) {
      return
    }

    if (movable.type === "workout_item") {
      const id_workout = movable.destination.droppableId
      const id_workout_item = movable.draggableId.replace("workout_item_", "")
      const position = movable.destination.index + 1
      const url = `${URL_BASE}/module/thetraktor/program?action=move_workout_item&id_program=1&id_workout=${id_workout}&id_workout_item=${id_workout_item}&position=${position}`
      await axios.get(url)
      await getData()
      return
    }

    const filterWorkout = workouts.map((item) => {
      if (Number(item.id) === Number(movable.draggableId)) {
        if (movable.destination) {
          item.date = movable.destination.droppableId
        }
      }
      return item
    })
    setWorkouts(filterWorkout)
    const { data, status } = await axios.get(
      `${URL_BASE}/module/thetraktor/program?action=move_workout&id_program=1&id_workout=${
        movable.draggableId
      }&date=${movable.destination.droppableId}&position=${
        Number(movable.destination.index) + 1
      }`,
    )
    if (status === 200) {
      if (!data?.success) {
        getData()
        toast.error(data?.error)
      }
    }
  }

  const onUploadAudio = async (date: string, file: File) => {
    const formData = new FormData()
    formData.append("audio", file)
    const { data, status } = await axios.post(
      `${URL_BASE}/module/thetraktor/program?action=upload_audio&id_program=1&date=${date}`,
      formData,
    )
    if (status === 200) {
      if (data?.success) {
        toast.success("Audio cargado")
        setAudios(data?.psdata)
      } else {
        toast.error(data?.error)
      }
    }
  }

  const onDeleteAudio = async (date: string) => {
    const au = audios.filter((audio) => {
      return audio.date !== date
    })
    setAudios(au)
  }

  useEffect(() => {
    setWorkouts(data)
  }, [data])

  useEffect(() => {
    getAudios()
  }, [])

  return (
    <>
      <DragDropContext
        onDragEnd={(res) => {
          const input = {
            draggableId: res.draggableId,
          } as IDragContext

          if (res.destination?.droppableId) {
            input.destination = {
              droppableId: res.destination?.droppableId,
              index: res.destination?.index,
            }
          }

          if (res.type) {
            input.type = res.type
          }
          onMoveWorkout(input)
        }}
      >
        {loadingGeneral && (
          <div className="absolute h-full w-full bg-white opacity-50 z-10" />
        )}
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
              onUploadAudio={onUploadAudio}
              audios={audios}
              onDeleteAudio={onDeleteAudio}
              onCoyWorkout={onCoyWorkout}
              onSelect={onSelect}
              selecteds={selecteds}
              pasteWorkout={pasteWorkout}
            />
          ))}
        </div>
      </DragDropContext>
      {selecteds && selecteds?.length > 0 && (
        <div className="calendar__footer items-center flex flex-row px-4 justify-between  bg-slate-200 h-[120px] w-full">
          <div className="flex flex-row">
            <div className="text-sm font-bold">
              {selecteds?.length} seleccionados
            </div>
            <div>
              {" "}
              <button
                onClick={() => setSelected([])}
                className="btn hover:underline text-xs cursor-pointer  text-slate-500 btn--primary px-4"
              >
                Limpiar seleccionados
              </button>
            </div>
          </div>

          <div className="items-center flex flex-row">
            <button
              onClick={() => onCoyWorkout(selecteds, true)}
              className="btn btn--primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-slate-600"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => onDeleteWorkout(selecteds)}
              className="btn btn--primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Calendar
