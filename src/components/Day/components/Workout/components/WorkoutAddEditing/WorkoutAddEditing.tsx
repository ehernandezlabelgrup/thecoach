import React from 'react'
import { useForm } from 'react-hook-form'
import TrashIcon from '../../../../../Icons/TrashIcon'
import WorkoutExercise from '../WorkoutExercise'
import { Exercise, Workout } from '../../../../../../interfaces/workout'
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalFooter, TERipple } from 'tw-elements-react'

interface Props {
    onCanceled: () => void; // Function to call when the cancel button is clicked
    data: Workout;          // Data for the workout to be edited
    onSave: (workout: Workout) => void; // Function to call when saving the workout
}

/**
 * WorkoutAddEditing - A component for adding or editing a workout.
 * It allows users to input the title, warmup, and cooldown of a workout,
 * along with managing the exercises involved.
 */
const WorkoutAddEditing: React.FC<Props> = ({ onCanceled, data, onSave }) => {

    const [showModal, setShowModal] = React.useState(false)
    const { register, handleSubmit, setValue } = useForm<Workout>({
        defaultValues: {
            ...data
        }
    })

    // Handler for form submission
    const onSubmit = (values: Workout) => {
        onSave(values)

    }

    const onChangeExercise = (values: Exercise[]) => {
        setValue('exercises', values)
    }

    return (
        <div className="add is-editing is-small" data-test="workout-day">
            {/* Workout Header */}
            <div draggable="false" id="ember755" className="js-draggableObject draggable-object ember-view">
                <div className="row row--o row--m split split--nowrap mt-4">
                    <div className="pr-1">
                        <div className="bucket bucket--flag bucket--f">
                            <div className="bucket-media">
                                <input
                                    aria-label="Select Workout"
                                    className="workout-checkbox"
                                    data-test="workout-form-select-action"
                                    tabIndex={-1}
                                    type="checkbox"
                                />
                            </div>
                            <div className="bucket-content">
                                <span className="text-sm font-bold text-blue-300"></span>
                                <input
                                    {...register("title")}
                                    aria-label="Workout Title Input"
                                    className="addInput addInput--title js--focus"
                                    data-test="workout-title"
                                    placeholder="Title (optional)"
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
                            placeholder="Add warmup"
                            id="ember759"
                            className="ember-text-area font-[400] text-xs ember-view addInput addInput--base addInput--textarea autoExpand"
                            aria-label="Add warmup"
                            data-test="type-textarea"
                            style={{ height: "56px" }}
                        />
                    </div>
                </div>
                <WorkoutExercise
                onChange={onChangeExercise}
                data={data?.exercises} />
            </div>
            <div id="ember248" className="pillar pillar--t row row--o row--m prnt-cooldownWrap mb-3 ember-view">
                <div className="split prnt-cooldown" data-print="cooldown">
                    <div className="mr-3">
                        <textarea
                            {...register("cooldown")}
                            spellCheck="false"
                            placeholder="Add cooldown"
                            id="ember249"
                            className="ember-text-area ember-view addInput addInput--base addInput--textarea autoExpand"
                            aria-label="Add cooldown"
                            data-test="type-textarea"
                            style={{ height: '36px' }}
                       />
                    </div>
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
                        className="pl-3" data-test="open-delete-confirmation" type="button">
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            </div>

            <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>

            {/* <!--Modal body--> */}
            <TEModalBody>Delete this workout from your program's calendar?</TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="warning">
                <div
                  className="ml-1 cursor-pointer inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Delete Workout
                </div>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
        </div>
    )
}

export default WorkoutAddEditing
