import MoveIcon from "../../../../../Icons/MoveIcon"
import PasteIcon from "../../../../../Icons/PasteIcon"

interface Props {
  title: string

}

const WorkoutHeader = ({ title, provided, onCoyWorkout, selected, onSelect }: Props) => {
  return (
    <div className="workout-header js--workout-header-10427706617">
      <div className="split split--nowrap">
        <div className="pt-1 pb-1">
          <div className="bucket bucket--f">
            <div 
            onClick={e => e.stopPropagation()}
            className="bucket-media">
              <input
                aria-label="Select Workout"
                className="workout-checkbox"
                data-test="workout-header-select-action"
                type="checkbox"
                checked={selected}
                onClick={() => onSelect()}
              />
            </div>
            <div className="bucket-content" data-test="workout-title">
              <div className="workout-title font-bold" title="In-Gym Workout">
                {title}
              </div>
            </div>
          </div>
        </div>
        <div className="workout-controls tc-list tc-list--inline tc-list--flag tc-list--f">
          <a onClick={e => {
            e.stopPropagation()
            onCoyWorkout()
          }}  className="tc-list-item workout-copy ember-tooltip-target">
            <PasteIcon />
          </a>
          {provided && <a {...provided.dragHandleProps} className="workout-drag js--drag-handle tc-list-item">
            <MoveIcon />
          </a>}
        </div>
      </div>
    </div>
  )
}

export default WorkoutHeader