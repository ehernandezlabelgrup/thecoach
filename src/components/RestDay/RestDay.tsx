import { IWorkout } from "../../interfaces/workout"
import WorkoutHeader from "../Day/components/Workout/components/WorkoutHeader"
import TrashIcon from "../Icons/TrashIcon"
import Modal from "../Modal"
import { useState } from "react"

interface IProps {
  data: IWorkout;
  onClick: () => void;
  isEditing: boolean;
  onDelete: () => void;
}

const RestDay = ({ data, onClick, isEditing, onDelete }: IProps) => {
  const [showModal, setShowModal] = useState(false)

  const onDeleteRestDay = async() => {
    await onDelete()
    setShowModal(false)
  }

  return (
    <div
      onClick={onClick}
      className={`workout is-active is-small has-workoutControls`}
    >
      <WorkoutHeader title={data.title} />
      <div data-test="delete-button">
        {isEditing && (
          <button
            onClick={() => setShowModal(true)}
            className="pl-3"
            data-test="open-delete-confirmation"
            type="button"
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <Modal
        onRequestClose={() => setShowModal(false)}
        onAccept={onDeleteRestDay}
        visible={showModal}
      >
        ¿Esta seguro que desea eliminar este rest day?
      </Modal>
    </div>
  )
}

export default RestDay
