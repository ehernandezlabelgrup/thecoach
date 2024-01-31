import {
  TEPopover,
  TEPopoverContent,
  TEPopoverToggler,
} from "tw-elements-react"
import { Exercise } from "../../../../../../interfaces/workout"
import XMarkIcon from "../../../../../Icons/XMarkIcon"
import { useState } from "react"
import axios from "axios"

interface Props {
  data: Exercise[]
  onDeleteExercise?: (id: number) => void
  URL_BASE: string
}

const ExercisesItems = ({ data, onDeleteExercise, URL_BASE }: Props) => {
  const [video, setVideo] = useState<string | null>(null)

  const getVideo = (id: number) => {
    axios
      .get(`${URL_BASE}module/thetraktor/getexercise?id=${id}`)
      .then((response) => {
        if (response.status === 200) {
          setVideo(response?.data?.psdata?.video)
        }
        return response.data
      })
  }

  return (
    <div
      className="my-1 flex flex-row gap-1 flex-wrap"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {data?.map((exercise: Exercise) => {
        return (
          <div
            key={exercise.id}
            className="cursor-pointer bg-slate-100 rounded-full flex items-center flex-row gap-1 !text-xs"
            data-test="selected-exercise"
          >
            <TEPopover
              onShow={() => {
                if (exercise.video) setVideo(exercise.video)
                else {
                  getVideo(exercise.id)
                }
              }}
              trigger="focus"
            >
              <div className="relative w-5">
                <TEPopoverToggler
                  id="ember275"
                  className="tag-icon z-10 absolute top-0 left-0 exercise-preview-wrap w-4 h-4  ember-view"
                ></TEPopoverToggler>
                <button
                  className="aboslute z-0 pt-1 pl-1 top-0 left-0 w-full h-full"
                  style={{
                    userSelect: "none",
                  }}
                >
                  <svg
                    style={{
                      userSelect: "none",
                      MozUserFocus: "none",
                      msTouchSelect: "none",
                      appearance: "none",
                    }}
                    className="svg-inline--fa fa-video add-icon text-gray-600 fa-fw fa-sm is-attached"
                    data-prefix="fas"
                    data-icon="video"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    id="ember275st240"
                    data-test="exercise-add-form-toggle"
                    tabIndex={-1}
                  >
                    <path
                      style={{
                        userSelect: "none",
                      }}
                      fill="currentColor"
                      d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
                    />
                  </svg>
                </button>
              </div>
              <TEPopoverContent>
                <div className="card  bg-white  shadow ember-tether-element-inner ember-tether-element-inner--fw--m exercise-preview-form p-3">
                  <h4 className="font-bold">{exercise.name}</h4>
                  <div className="embed">
                    {video && (
                      <video controls className="w-full h-[300px]">
                        <source src={video} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
              </TEPopoverContent>
            </TEPopover>
            <div className="!text-[10px] !leading-3 pr-2">{exercise?.name}</div>
            {onDeleteExercise && (
              <button
                onClick={() => onDeleteExercise(exercise.id)}
                className="bg-gray-200 hover:bg-gray-400 w-5 h-5 rounded-full items-center flex justify-center"
                type="button"
              >
                <XMarkIcon />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ExercisesItems
