import { Dayjs } from "dayjs";
import DayHeader from "../DayHeader";
import DayEmpty from "../DayEmpty/DayEmpty";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";
import Workouts from "../Workouts/Workouts";
import { useMemo } from "react";
import { Droppable } from "@hello-pangea/dnd";

interface IProps {
  day: Dayjs;
}

export const Day = ({ day }: IProps) => {
  const date = day.format("YYYY-MM-DD");
  const { programData, activeDay } = useCalendar();
  const isToday = day.isSame(new Date(), "day");
  const data = programData?.filter((item) => item.date === date);

  const isActive = useMemo(() => activeDay?.date === date, [activeDay, date]);
  return (
    <div
      className="flex flex-1 h-full flex-shrink flex-col ${"
      style={{
        minWidth: isActive ? 400 : "auto",
      }}
    >
      <DayHeader isToday={isToday} day={day} />
      <Droppable key={date} droppableId={date}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${
              isToday
                ? "border-blue-400"
                : isActive
                ? "border-orange-500"
                : "border-gray-300"
            } flex-1 border h-full`}
          >
            {data && Array.isArray(data) && data.length > 0 ? (
              <Workouts enable={isActive} date={date} data={data} />
            ) : (
              <DayEmpty date={date} />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
