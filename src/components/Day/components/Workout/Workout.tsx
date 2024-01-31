import {
  ICategories,
  ITypesMark,
  IWorkout,
} from "../../../../interfaces/workout"
import WorkoutHeader from "./components/WorkoutHeader"
import "./styles.css"
import WorkoutAddEditing from "./components/WorkoutAddEditing"
import ExercisesItems from "./components/ExercisesItems"
import WorktoutTextSplit from "./components/WorktoutTextSplit"
import { Draggable } from "react-beautiful-dnd"
import WorkoutItemsContent from "./components/WorkoutItemsContent"
import { useContext } from "react"
import { AppContext } from "../../../../App"

interface Props {
  data: IWorkout
  isEditing: boolean
  onClick: () => void
  onCanceled: () => void
  onSave: (workout: IWorkout) => void
  typesMark: ITypesMark[]
  categories: ICategories[]
  onDelete: () => void
  index: number
  onCoyWorkout: (id: number) => void
  selected: boolean
  onSelect: (id: number) => void
  URL_BASE: string
}

const Workout = ({
  data,
  isEditing,
  onClick,
  onCanceled,
  onSave,
  typesMark,
  categories,
  onDelete,
  index,
  onCoyWorkout,
  selected,
  onSelect,
  URL_BASE,
}: Props) => {
  const { truncate } = useContext(AppContext)
  if (isEditing)
    return (
      <WorkoutAddEditing
        typesMark={typesMark}
        categories={categories}
        data={data}
        onCanceled={onCanceled}
        onSave={onSave}
        onDelete={onDelete}
        URL_BASE={URL_BASE}
      />
    )
  return (
    <Draggable draggableId={`${data?.id.toString()}`} index={index}>
      {(provided) => (
        <div
          className="bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            onDoubleClick={onClick}
            className={`workout ${
              truncate && "is-truncate"
            } is-active is-small has-workoutControls`}
          >
            <WorkoutHeader
              selected={selected}
              onSelect={() => onSelect(data?.id)}
              onCoyWorkout={() => onCoyWorkout(data?.id)}
              provided={provided}
              title={data.title}
            />
            <div className="">
              <div className="px-3">
                {!truncate && data?.warmup && (
                  <div className="border-b border-gray-200 pb-1 mb-3">
                    <WorktoutTextSplit
                      className="text-gray-400"
                      slipt={false}
                      text={data?.warmup}
                    />
                  </div>
                )}
                {!truncate && (
                  <ExercisesItems URL_BASE={URL_BASE} data={data?.exercises} />
                )}
              </div>

              <WorkoutItemsContent
                categories={categories}
                id={data?.id}
                data={data?.workout_items}
                URL_BASE={URL_BASE}
              />

              {!truncate && data?.cooldown && (
                <div className="row row--s">
                  <WorktoutTextSplit text={data?.cooldown} />
                </div>
              )}
              {!truncate && data?.notes && (
                <div className="row row--s">
                  <WorktoutTextSplit text={data?.notes} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Workout
