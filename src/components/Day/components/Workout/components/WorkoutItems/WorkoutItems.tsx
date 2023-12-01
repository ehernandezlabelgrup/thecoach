import { WorkoutItem } from "../../../../../../interfaces/workout"

interface Props {
    data: WorkoutItem
    index: number
}


const WorkoutItems = ({
    data, 
    index,
}: Props) => {
    const letter =  String.fromCharCode(65 + index)
  return (
    <div>
    <div draggable="true" id="ember906" className="select-none is-disabled js-draggableObject draggable-object ember-view">
        <div className="exercise bucket bucket--f bucket--base">
            <div className="bucket-media cursor-move">
                {/* Content for bucket-media if needed */}
            </div>
            <div className="exercise-content bucket-content">
                <div className="exercise-title" data-test="exercise-title">
                    {letter}) {data?.name}
                </div>
                <ul className="tc-list tc-list--f">
                    <li className="tc-list-item exercise-desc">
                        4-6 reps/arm; rest :60
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  )
}

export default WorkoutItems