import { IWorkout } from "../../interfaces/workout";
import WorkoutHeader from "../Day/components/Workout/components/WorkoutHeader";
import TrashIcon from "../Icons/TrashIcon";
import Modal from "../Modal";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface IProps {
  data: IWorkout;
  onClick: () => void;
  isEditing: boolean;
  onDelete: () => void;
  index: number;
}

const RestDay = ({ data, onClick, isEditing, onDelete, index, onCoyWorkout, selected, onSelect }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  const onDeleteRestDay = async () => {
    await onDelete();
    setShowModal(false);
  };

  

  return (
    <Draggable draggableId={`${data?.id.toString()}`} index={index}>
      {(provided) => (
        <div
          className="bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            onClick={onClick}
            className={`workout is-active is-small has-workoutControls`}
          >
            <WorkoutHeader 
            selected={selected}
            onSelect={onSelect}
                                onCoyWorkout={()=> onCoyWorkout(data.id)}
                                

            provided={provided}
            title={data.title} />
            <div data-test="delete-button flex flex-row">
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
        </div>
      )}
    </Draggable>
  );
};

export default RestDay;
