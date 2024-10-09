import { Dayjs } from "dayjs";
import DayHeader from "../DayHeader";
import DayEmpty from "../DayEmpty/DayEmpty";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";
import Workouts from "../Workouts/Workouts";

interface IProps {
  day: Dayjs;
}

export const Day = ({ day }: IProps) => {
  const date = day.format("YYYY-MM-DD");
  const { programData } = useCalendar();

  const isToday = day.isSame(new Date(), "day");

  const data = programData?.find((day) => day.date === date);
  console.log(data, date);
  return (
    <div className="flex flex-col">
      <DayHeader isToday={isToday} day={day} />
      <div
        className={`${
          isToday ? "border-blue-400" : "border-gray-300"
        } flex-1 border h-full`}
      >
        {data ? <Workouts data={data} /> : <DayEmpty date={date} />}
      </div>
    </div>
  );
};
