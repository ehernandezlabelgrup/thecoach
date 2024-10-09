import dayjs from "dayjs";
import NavBar from "../NavBar";
import WeeksLabels from "../WeekLabels";
import { useMemo } from "react";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";
import Week from "../Week";

export default function Calendar() {
  const { currentDate } = useCalendar();

  const weeks = useMemo(() => {
    const start = dayjs(currentDate).startOf("month").startOf("week");
    const end = dayjs(currentDate).endOf("month").endOf("week");
    const days = [];
    let day = start;

    while (day.isBefore(end) || day.isSame(end)) {
      days.push(day);
      day = day.add(1, "day");
    }

    const weeksArray = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksArray.push({
        days: days.slice(i, i + 7),
      });
    }

    return weeksArray;
  }, [currentDate]);

  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="p-4">
        <NavBar />
      </div>
      <div>
        <WeeksLabels />
        {weeks.map((week, index) => (
          <div key={index} className="flex">
            <Week data={week} />
          </div>
        ))}
      </div>
    </div>
  );
}
