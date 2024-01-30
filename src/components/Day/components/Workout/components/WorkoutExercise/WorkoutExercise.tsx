/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react"
import { Exercise } from "../../../../../../interfaces/workout"
import { MentionsInput, Mention } from "react-mentions"
import axios from "axios"
import ExercisesItems from "../ExercisesItems"

interface Props {
  data: Exercise[]
  onChange: (exercises: Exercise) => void
}

export interface IExecercises {
  id: number
  name: string
  video: string
}

const WorkoutExercise = ({ data, onChange }: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>(data || [])
  const [value, setValue] = useState("")
  const timer = useRef<NodeJS.Timeout | null>(null)

  const getData = (query: string, callback: (arg0: never[]) => void) => {
    if (!query) return callback([])
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      axios
        .get(
          "https://pre.thetraktor.app/module/thetraktor/getallexercises?per_page=40&name=" +
            value,
        )
        .then((response) => {
          if (response.status === 200) {
            callback(
              response?.data?.psdata?.map((item: IExecercises) => {
                return {
                  id: item.id,
                  display: item.name,
                  name: item.name,
                  video: item.video,
                }
              }),
            )
          }
          return response.data
        })
    }, 500)
  }

  const deleteExercise = (id: number) => {
    const newData = exercises.filter((exercise: Exercise) => exercise.id !== id)
    onChange(newData as any)
    setExercises(newData)
  }
  const addExercise = (id: number, display: string) => {
    const existsInExercises = exercises.find(
      (exercise: Exercise) => exercise.id === id,
    ) as Exercise

    if (existsInExercises) {
      return
    }

    const newExercise = {
      id,
      name: display,
    }
    const newData = [...exercises, newExercise]
    onChange(newData as any)
    setExercises(newData)
    setValue("")
  }

  return (
    <>
      <div id="ember760" className="prnt-hide ember-view">
        <div className="split split--flag font-light pillar pillar--t pillar--xs mt-1">
          <div className="text-xs">
            <MentionsInput
              singleLine
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                input: {
                  paddingTop: 5,
                  paddingBottom: 5,
                  border: "none",
                  paddingLeft: 0,
                  fontSize: 11,
                  outline: "none",
                },
                suggestions: {
                  list: {
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    fontSize: 11,
                    fontWeight: "bold",
                    left: 0,
                  },
                  item: {
                    padding: "5px 15px",
                    borderBottom: "1px solid #ccc",
                    "&focused": {
                      backgroundColor: "#cee4e5",
                    },
                  },
                },
              }}
              placeholder={"Añadir ejercicio"}
              a11ySuggestionsListLabel={"Suggested mentions"}
            >
              <Mention
                trigger=""
                data={getData}
                onAdd={(id, display) => {
                  addExercise(Number(id), display)
                  setValue("")
                }}
              />
            </MentionsInput>
          </div>
          <div className="prnt-hide">
            <div
              id="ember239"
              className="exercise-preview-wrap relative ember-view"
            >
              <svg
                className="svg-inline--fa fa-video-plus text-gray-400 add-icon fa-fw fa-sm is-disabled"
                data-prefix="fas"
                data-icon="video-plus"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                id="ember239st240"
                data-test="exercise-add-form-toggle"
                tabIndex={-1}
              >
                <path
                  fill="currentColor"
                  d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm512 64c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L416 174.9V192 320v17.1l14.2 9.5 96 64c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2V128zM216 184v48h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v48c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h48V184c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <ExercisesItems data={exercises} onDeleteExercise={deleteExercise} />
      </div>
    </>
  )
}

export default WorkoutExercise
