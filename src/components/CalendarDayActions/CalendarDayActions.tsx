import PlusIcon from "../Icons/PlusIcon"

interface IProps {
  onCreateWorkout: () => void
  createRestDay: () => void
}

function CalendarDayActions({ onCreateWorkout, createRestDay }: IProps) {
  return (
    <div className="bubble" data-test="calendar-day-actions">
      <div
        onClick={onCreateWorkout}
        className="bubble-item basis-1/3"
        data-test="insert-new-workout"
      >
        <PlusIcon />
      </div>

      <div
        onClick={createRestDay}
        className="bubble-item basis-1/3 ember-tooltip-target"
        data-test="insert-new-rest-day"
      >
        <svg
          className="svg-inline--fa fa-battery-half fa-lg"
          data-prefix="fas"
          data-icon="battery-half"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M464 160c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16H464zM80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zm208 96H96V320H288V192z"
          ></path>
        </svg>
      </div>

      <div
        className="bubble-item basis-1/3 ember-tooltip-target"
        data-test="paste-workouts"
      >
        <svg
          className="svg-inline--fa fa-paste fa-lg"
          data-prefix="fas"
          data-icon="paste"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M160 0c-23.7 0-44.4 12.9-55.4 32H48C21.5 32 0 53.5 0 80V400c0 26.5 21.5 48 48 48H192V176c0-44.2 35.8-80 80-80h48V80c0-26.5-21.5-48-48-48H215.4C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48V448v16c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H320 272zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
          ></path>
        </svg>
        <div className="ember-tooltip-base ember-view">
          {/* Contenido adicional */}
        </div>
      </div>

      <div
        className="tooltip ember-tooltip ember-tooltip-effect-slide"
        role="tooltip"
        style={{
          margin: "0px 0px 10px",
          position: "absolute",
          willChange: "transform",
          top: "0px",
          left: "0px",
          transform: "translate3d(-3px, 136px, 0px)",
          visibility: "hidden",
        }}
      >
        <div
          className="tooltip-arrow ember-tooltip-arrow"
          style={{ left: "51px" }}
        ></div>
        <div
          className="tooltip-inner ember-tooltip-inner"
          id="ember314-et-target"
        >
          {/* Contenido adicional */}
          <div>Paste workout(s)</div>
        </div>
      </div>
    </div>
  )
}

export default CalendarDayActions
