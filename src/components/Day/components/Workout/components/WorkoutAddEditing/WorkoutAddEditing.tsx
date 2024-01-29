import React from "react"
import { useForm } from "react-hook-form"
import TrashIcon from "../../../../../Icons/TrashIcon"
import WorkoutExercise from "../WorkoutExercise"
import { Exercise, ICategories, ITypesMark, IWorkout, IWorkoutItem } from "../../../../../../interfaces/workout"
import EditWorkoutItem from "./components/EditWorkoutItem"
import Modal from "../../../../../Modal"

interface Props {
  onCanceled: () => void; // Function to call when the cancel button is clicked
  data: IWorkout; // Data for the workout to be edited
  onSave: (workout: IWorkout) => void; // Function to call when saving the workout
  typesMark: ITypesMark;
  categories: ICategories;
  onDelete: () => void;
}

/**
 * WorkoutAddEditing - A component for adding or editing a workout.
 * It allows users to input the title, warmup, and cooldown of a workout,
 * along with managing the exercises involved.
 */
const WorkoutAddEditing: React.FC<Props> = ({ onCanceled, data, onSave, typesMark, categories, onDelete }) => {
  const [workoutItems, setWorkoutItems] = React.useState<
IWorkoutItem[] | undefined
  >(data?.workout_items)
  const [showModal, setShowModal] = React.useState(false)
  const { register, handleSubmit, setValue, getValues, formState: {errors} } = useForm<IWorkout>({
    defaultValues: {
      ...data,
    },
  })

  // Handler for form submission
  const onSubmit = (values: IWorkout) => {
    onSave(values)
  }

  const onChangeExercise = (values: Exercise[]) => {
    setValue("exercises", values)
  }

  const addWorkoutItem = () => {
    const workout_items_values = getValues("workout_items")

    const count = workout_items_values?.length + 1
    const workoutItem = {
      id: -count,
    }

    const newWorkoutItems = [...workout_items_values, workoutItem]
    setWorkoutItems(newWorkoutItems as IWorkoutItem[])
    setValue("workout_items", newWorkoutItems as IWorkoutItem[])

  }

  const onDeleteWorkoutItem = (id: number) => {
    const workout_items_values = getValues("workout_items")

    const newWorkoutItems = workout_items_values?.filter(
      (item) => item.id !== id
    )
    setWorkoutItems(newWorkoutItems)
    setValue("workout_items", newWorkoutItems)
  }


  return (
    <div className="add is-editing is-small" data-test="workout-day">
      <div
        draggable="false"
        id="ember755"
        className={`js-draggableObject draggable-object ember-view ${errors?.title && 'bg-red-100'}`}
      >
        <div className="row row--o row--m split split--nowrap pt-4">
          <div className="pr-1">
            <div className="bucket bucket--flag bucket--f">
              <div className="bucket-content">
                <span className="text-sm font-bold text-blue-300"></span>
                <input
                  {...register("title", {
                    required: true,
                  })}
                  aria-label="Workout Title Input"
                  className="addInput addInput--title js--focus"
                  data-test="workout-title"
                  placeholder="Título (opcional)"
                  spellCheck="false"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="ember758" className="row row--o row--m my-3 ember-view">
        <div className="split prnt-warmup" data-print="warmup">
          <div>
            <textarea
              {...register("warmup")}
              spellCheck="false"
              placeholder="Warmup"
              id="ember759"
              className="ember-text-area font-[400] text-xs ember-view addInput addInput--base addInput--textarea autoExpand"
              aria-label="Warmup"
              data-test="type-textarea"
              style={{ height: "56px" }}
            />
          </div>
        </div>
        <WorkoutExercise onChange={onChangeExercise} data={data?.exercises} />
      </div>
      <div className="workouts-items bg-gray-50 relative">
        {workoutItems?.map((item, index) => (
          <div 
          key={index}
          className="border-t border-gray-300 relative">
            <EditWorkoutItem 
            {...item}
            typesMark={typesMark}
            categories={categories}
            key={index} register={register} index={index} 
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            />
            {index > 0 && (
              <div 
              onClick={() => onDeleteWorkoutItem(item.id)}
              className="absolute h-10 shadow items-center justify-center flex z-10 w-7 rounded cursor-pointer top-[100px] -left-4 bg-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div
          onClick={addWorkoutItem}
          className="bg-gray-300 flex flex-row items-center gap-1 uppercase absolute rounded px-2 left-[90px] cursor-pointer text-xs font-bold py-1 -bottom-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <small className="">
            <strong>Ejercicio</strong>
          </small>
        </div>
      </div>
      <div
        id="ember248"
        className="pillar pillar--t row row--o row--m prnt-cooldownWrap mb-3 ember-view"
      >
        <div className="split prnt-cooldown" data-print="cooldown">
          <div className="mr-3">
            <textarea
              {...register("cooldown")}
              spellCheck="false"
              placeholder="Cooldown"
              id="ember249"
              className="ember-text-area ember-view addInput addInput--base addInput--textarea autoExpand"
              aria-label="Add cooldown"
              data-test="type-textarea"
              style={{ height: "36px" }}
            />
          </div>
        </div>
      </div>
      <div
        id="ember248"
        className="pillar pillar--t row row--o row--m prnt-cooldownWrap mb-3 ember-view"
      >
        <div className="split prnt-cooldown" data-print="notes">
            <textarea
              {...register("notes")}
              spellCheck="false"
              placeholder="Notas sesión"
              id="ember249"
              className="ember-text-area ember-view addInput addInput--base addInput--textarea autoExpand"
              aria-label="Notas sesión"
              data-test="type-textarea"
              style={{ height: "36px" }}
            />
        </div>
      </div>
      <div className="row row--o pillar pillar--t pr-0 mt-3 prnt-hide pb-4 pillar--s row--s">
        <div className="split split--flag">
          <div className="flex flex-row gap-1">
            <button
              onClick={handleSubmit(onSubmit)}
              className="text-xs bg-blue-400 rounded px-2 py-1 text-white"
              data-test="save-button"
              type="button"
            >
              Save
            </button>

            <button
              onClick={onCanceled}
              className="text-xs rounded px-2 py-1 text-dark"
              data-test="cancel-button"
              type="button"
            >
              Cancel
            </button>
          </div>

          <div data-test="delete-button">
            <button
              onClick={() => setShowModal(true)}
              className="pl-3"
              data-test="open-delete-confirmation"
              type="button"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
      <Modal
        onRequestClose={() => setShowModal(false)}
        onAccept={onDelete}
        visible={showModal}
      >
        ¿Esta seguro que desea eliminar este workout?
      </Modal>
    </div>
  )
}

export default WorkoutAddEditing
