import { useRef } from "react";
import Day from "../Day";
import { IWeek } from "../../interfaces";

interface IProps {
  data: IWeek;
}

export default function Week({ data }: IProps) {
  const refWeek = useRef(null);

  return (
    <div ref={refWeek} className="flex w-full">
      {data?.days.map((day) => {
        const date = day.format("YYYY-MM-DD");
        return (
          <div key={date} className="flex-1">
            <Day day={day} />
          </div>
        );
      })}
    </div>
  );
}
