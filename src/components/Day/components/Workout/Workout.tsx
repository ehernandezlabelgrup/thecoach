import { ICategories, ITypesMark, IWorkout } from "../../../../interfaces/workout"
import WorkoutHeader from "./components/WorkoutHeader"
import WorkoutItems from "./components/WorkoutItems"
import WorkoutWarmUp from "./components/WorkoutWarmUp"
import "./styles.css"
import WorkoutAddEditing from "./components/WorkoutAddEditing"
import ExercisesItems from "./components/ExercisesItems"
import WorktoutTextSplit from "./components/WorktoutTextSplit"
import { Draggable } from "react-beautiful-dnd";

interface Props {
  data: IWorkout;
  isEditing: boolean;
  onClick: () => void;
  onCanceled: () => void;
  onSave: (workout: IWorkout) => void;
  truncate: boolean;
  typesMark: ITypesMark;
  categories: ICategories;
  onDelete: () => void;
  index: number;

}

const Workout = ({
  data,
  isEditing,
  onClick,
  onCanceled,
  onSave,
  truncate,
  typesMark,
  categories,
  onDelete,
  index,
  onCoyWorkout,
  selected,
  onSelect
}: Props) => {



  if (isEditing)
    return (
      <WorkoutAddEditing 
      typesMark={typesMark}
      categories={categories}
      data={data} onCanceled={onCanceled} onSave={onSave}
      onDelete={onDelete}
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
      onCoyWorkout={()=> onCoyWorkout(data?.id)}
      provided={provided}
      title={data.title} />
      <div className="law workout-contents">
        <div className="row row--s">
          {data?.warmup && <WorkoutWarmUp warmup={data?.warmup} />}
          {!truncate && <ExercisesItems data={data?.exercises} />}
        </div>
        <div
          id="ember644"
          className="workout-items sortable-objects ember-view"
        >
          {data?.workout_items?.map((item, index) => (
            <>
            <WorkoutItems 
            categories={categories}
            index={index} key={index} data={item} />
             {!truncate && <div className="px-2"><ExercisesItems data={item?.exercises} /></div>}
            </>
          ))}
          {data?.cooldown && <div className="row row--s">
            <WorktoutTextSplit text={data?.cooldown} />
          </div>}
         {data?.notes &&  <div className="row row--s">
            <WorktoutTextSplit text={data?.notes} />
          </div>}
        </div>
      </div>
    </div>
    </div>
    )}
    </Draggable>
  )
}

export default Workout
