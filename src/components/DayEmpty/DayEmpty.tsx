import PasteIcon from "../Icons/PasteIcon";
import DayActionButton from "../DayActionButton";
import RestDayIcon from "../Icons/RestDayIcon/RestDayIcon";
import PlusIcon from "../Icons/PlusIcon";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";

interface IProps {
  date: string;
}

const DayEmpty = ({ date }: IProps) => {
  const { createNewDay, createRestDay } = useCalendar();

  return (
    <div className="p-4 empty-day opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
      <div className="h-full w-full rounded flex flex-row flex-wrap bg-gray-200">
        <DayActionButton
          onClick={() => createNewDay(date)}
          Icon={PlusIcon}
          size="w-3 h-3"
        />
        <DayActionButton
          onClick={() => createRestDay(date)}
          Icon={RestDayIcon}
          size="w-4 h-4"
        />
        <DayActionButton Icon={PasteIcon} size="w-4 h-4" />
      </div>
    </div>
  );
};

export default DayEmpty;
