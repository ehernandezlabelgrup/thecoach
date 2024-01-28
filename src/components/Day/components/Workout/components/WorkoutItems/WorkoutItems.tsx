import { IWorkoutItem } from "../../../../../../interfaces/workout"

interface Props {
  data: IWorkoutItem;
  index: number;
}

const WorkoutItems = ({ data, index }: Props) => {
  const renderIconType = (type: string) => {
    if (type === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(74 222 128 / 100%)"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )
    }
    if (type === 2) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(74 222 128 / 100%)"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          />
        </svg>
      )
    }
    if (type === 3) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path d="m16.2 10.7.6-2.4c.1-.3.5-1.7-.3-2.9-.6-.9-1.8-1.4-3.5-1.4h-2c-1.7 0-2.9.5-3.5 1.4-.8 1.2-.4 2.5-.3 2.9l.6 2.4c-1.1 1.1-1.8 2.6-1.8 4.3 0 2.1 1.1 3.9 2.7 5h6.6c1.6-1.1 2.7-2.9 2.7-5 0-1.7-.7-3.2-1.8-4.3m-6.6-1.2-.5-1.7v-.1s-.2-.7.1-1.1c.2-.4.8-.6 1.8-.6h2c.9 0 1.6.2 1.9.5.3.4.1 1.1.1 1.1l-.5 1.9c-.8-.3-1.6-.5-2.5-.5s-1.7.2-2.4.5z" />
        </svg>
      )
    }

    return null
  }

  const letter = String.fromCharCode(65 + index)
  return (
    <div>
      <div
        draggable="true"
        id="ember906"
        className="select-none is-disabled js-draggableObject draggable-object ember-view"
      >
        <div className="exercise bucket bucket--f bucket--base">
          <div className="bucket-media cursor-move">
            {/* Content for bucket-media if needed */}
          </div>
          <div className="exercise-content bucket-content">
            <div className="additional-data flex gap-1 flex-row">
              {data?.is_ranking && (
                <div className="bg-blue-100 w-5 h-5 p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(96 165 250 / 100%)"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {data?.id_thetraktor_type_mark !== 0 && (
                <div className="bg-green-100 w-5 h-5 rounded items-center justify-center flex">
                  {renderIconType(data?.id_thetraktor_type_mark)}
                </div>
              )}
              {data?.min_result !== "0" && (
                <div>
                  <div className=" whitespace-nowrap rounded bg-red-400 text-center align-baseline text-xs h-5 px-1 items-center flex font-bold text-white">
                    {data?.min_result}
                  </div>
                </div>
              )}
            </div>
            <div
              className="exercise-title font-bold"
              data-test="exercise-title"
            >
              {letter}) {data?.name}
            </div>
            <ul className="tc-list tc-list--f">
              <li className="tc-list-item exercise-desc">{data?.info}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutItems
