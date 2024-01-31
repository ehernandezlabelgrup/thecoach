/* eslint-disable @typescript-eslint/no-explicit-any */
import MoveIcon from "../../../../../Icons/MoveIcon"
import PasteIcon from "../../../../../Icons/PasteIcon"

interface Props {
  title: string
  provided?: any
  onCoyWorkout: () => void
  selected: boolean
  onSelect: () => void
}

const WorkoutHeader = ({
  title,
  provided,
  onCoyWorkout,
  selected,
  onSelect,
}: Props) => {
  return (
    <div className="relative px-3 pt-1 js--workout-header-10427706617">
      <div className="split split--nowrap">
        <div className="pt-1 pb-1">
          <div className="flex items-center gap-1 flex-row">
            <div onClick={(e) => e.stopPropagation()} className="bucket-media">
              <input
                aria-label="Select Workout"
                className="workout-checkbox !m-0"
                data-test="workout-header-select-action"
                type="checkbox"
                checked={selected}
                onClick={() => onSelect()}
              />
            </div>
            <div className="bucket-content" data-test="workout-title">
              <div
                className="text-gray-400 pt-[2px] font-bold text-[13px]"
                title={title}
              >
                {title}
              </div>
            </div>
          </div>
        </div>
        <div className="workout-controls tc-list tc-list--inline tc-list--flag tc-list--f">
          <a
            onClick={(e) => {
              e.stopPropagation()
              onCoyWorkout()
            }}
            className="tc-list-item workout-copy ember-tooltip-target"
          >
            <PasteIcon />
          </a>
          {provided && (
            <a
              {...provided.dragHandleProps}
              className="workout-drag js--drag-handle tc-list-item"
            >
              <MoveIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkoutHeader
