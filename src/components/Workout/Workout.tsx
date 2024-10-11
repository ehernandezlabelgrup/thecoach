import WorkoutHeader from "../WorkoutHeader";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";
import Modal from "../Modal";
import TrashIcon from "../Icons/TrashIcon";
import { useMemo } from "react";
import InputDescription from "../InputDescription";
import VideoAdd from "../VideoAdd";
import { ProgramSession } from "../../interfaces";
import { Draggable } from "@hello-pangea/dnd";
import WorkoutItems from "../WorkoutItems";

interface IProps extends ProgramSession {
  enable: boolean;
  index: number;
}

const Workout = ({
  id,
  title,
  enable,
  date,
  warmup,
  exercises,
  index,
  workout_items,
  ...props
}: IProps) => {
  console.log(props);
  const { activeDayHandler, deleteWorkout, activeDay } = useCalendar();

  const isActive = useMemo(() => {
    if (enable) {
      return activeDay?.date === date && activeDay?.id_workout === id;
    }
    return false;
  }, [activeDay, date, enable, id]);

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="font-proximanova w-full min-h-40"
        >
          <div
            onClick={() => {
              if (!isActive)
                activeDayHandler({
                  date,
                  id_workout: id,
                });
            }}
          >
            <div className="flex flex-col gap-2 mt-2">
              <WorkoutHeader
                dragHandleProps={provided.dragHandleProps}
                enable={isActive}
                title={title}
                id={id}
              />
              <InputDescription enable={isActive} data={warmup} />
              <VideoAdd enable={isActive} data={exercises} />
            </div>
            <WorkoutItems items={workout_items} enable={isActive} />
          </div>
          {isActive && (
            <div className="workout-actions-buttons flex flex-row border-gray-300 border-t">
              <div className="gap-1 p-2 flex-1  flex flex-row">
                <button className="text-xs font-proximanova bg-blue-300 p-1 rounded text-white">
                  Guardar
                </button>
                <button
                  onClick={() => activeDayHandler(null)}
                  className="text-xs font-proximanova bg-gray-300 p-1 rounded text-black"
                >
                  Cancelar
                </button>
              </div>
              <Modal
                textAccept="Eliminar"
                onAccept={() => deleteWorkout(Number(id))}
                button={
                  <div className="p-2">
                    <TrashIcon className="w-6 h-6 fill-slate-500" />
                  </div>
                }
                title="Eliminar workout"
              >
                <p>¿Esta seguron que quiere Eliminar este workout?</p>
              </Modal>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Workout;
