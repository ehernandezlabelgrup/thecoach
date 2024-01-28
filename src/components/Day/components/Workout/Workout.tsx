import { ICategories, ITypesMark, IWorkout } from "../../../../interfaces/workout"
import WorkoutHeader from "./components/WorkoutHeader"
import WorkoutItems from "./components/WorkoutItems"
import WorkoutWarmUp from "./components/WorkoutWarmUp"
import WorkoutCooldown from "./components/WorktoutCooldown"
import "./styles.css"
import WorkoutAddEditing from "./components/WorkoutAddEditing"
import ExercisesItems from "./components/ExercisesItems"

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
  onDelete
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
    <div
      onClick={onClick}
      className={`workout ${
        truncate && "is-truncate"
      } is-active is-small has-workoutControls`}
    >
      <WorkoutHeader title={data.title} />
      <div className="law workout-contents">
        <div className="row row--s">
          <WorkoutWarmUp warmup={data?.warmup} />
          {!truncate && <ExercisesItems data={data?.exercises} />}
        </div>
        <div
          id="ember644"
          className="workout-items sortable-objects ember-view"
        >
          {data?.workout_items?.map((item, index) => (
            <WorkoutItems index={index} key={index} data={item} />
          ))}
          <div className="row row--s">
            <WorkoutCooldown cooldown={data?.cooldown} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workout
