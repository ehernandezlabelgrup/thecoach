import { useRef } from "react";
import MoveIcon from "../Icons/MoveIcon";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Checkbox } from "@nextui-org/react";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";

interface IProps {
  title: string;
  enable: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const WorkoutHeader = ({
  title,
  enable,
  dragHandleProps,
  id,
}: IProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const { onSelectworkout, copiedWorkout } = useCalendar();
  return (
    <div className="flex flex-row px-2 font-proximanova cursor-pointer items-center">
      <div className="flex cursor-pointer items-center">
        <Checkbox
          onChange={() => onSelectworkout(id)}
          onClick={(e) => e.stopPropagation()}
          isSelected={copiedWorkout.includes(id)}
        />
      </div>
      <div className="flex-grow">
        {enable ? (
          <input
            ref={refInput}
            type="text"
            className="w-full font-bold focus:outline-none text-sm px-2 bg-transparent"
            placeholder="Nombre del día"
            defaultValue={title}
          />
        ) : (
          <div
            onClick={() => {
              setTimeout(() => {
                if (refInput.current) refInput.current.focus();
              }, 300);
            }}
            className="w-full font-bold focus:outline-none text-sm px-2 bg-transparent"
          >
            {title}
          </div>
        )}
      </div>
      <div>
        {!enable && (
          <div {...dragHandleProps} className="text-slate-500 cursor-pointer">
            <MoveIcon />
          </div>
        )}
      </div>
    </div>
  );
};
