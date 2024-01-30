import {
  TEPopover,
  TEPopoverContent,
  TEPopoverToggler,
} from "tw-elements-react"
import { Exercise } from "../../../../../../interfaces/workout"
import XMarkIcon from "../../../../../Icons/XMarkIcon"

interface Props {
  data: Exercise[]
  onDeleteExercise?: (id: number) => void
}

const ExercisesItems = ({ data, onDeleteExercise }: Props) => {
  return (
    <div
      className="tags add-tags scroll my-1"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {data?.map((exercise: Exercise) => {
        return (
          <div
            key={exercise.id}
            className="tag cursor-pointer tag--remove mr-1 mb-1 add-tag"
            data-test="selected-exercise"
          >
            <TEPopover trigger="focus">
              <div className="relative w-5">
                <TEPopoverToggler
                  id="ember275"
                  className="tag-icon z-10 absolute top-0 left-0 exercise-preview-wrap w-4 h-4  ember-view"
                ></TEPopoverToggler>
                <button
                  className="aboslute z-0 top-0 left-0 w-full h-full"
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
                    <video controls className="w-full h-[300px]">
                      <source src={exercise.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </TEPopoverContent>
            </TEPopover>
            <span className="tag-label leading-3">{exercise?.name}</span>
            {onDeleteExercise && (
              <button
                onClick={() => onDeleteExercise(exercise.id)}
                className="btn btn--s tag-remove"
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
