import { Dayjs } from "dayjs";

const DayHeader = ({ day, isToday }: { day: Dayjs; isToday: boolean }) => {
  return (
    <div
      className={`${
        isToday
          ? "bg-yellow-300  border-yellow-400"
          : "bg-gray-300  border-gray-400"
      } border-l border-r p-1`}
    >
      <div className="text-xs font-hongkong capitalize">
        {day.format("MMM DD")}
      </div>
    </div>
  );
};

export default DayHeader;
