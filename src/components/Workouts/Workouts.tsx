import React from "react";
import { ProgramSession } from "../../interfaces";

interface IProps {
  data: ProgramSession;
}

function Workouts({ data }: IProps) {
  console.log(data);
  if (data.rest_day) {
    return (
      <div className="rest-day font-proximanova min-h-40">
        <div className="flex flex-row p-2 cursor-pointer items-center">
          <div className="flex cursor-pointer items-center">
            <input
              id="rest-day-checkbox"
              type="checkbox"
              className="w-5 h-5 mb-0 border border-gray-400 appearance-none relative after:hidden after:content-[''] checked:after:block after:w-4 after:h-4 after:rounded-sm after:bg-blue-300 after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2"
            />
          </div>
          <input
            type="text"
            disabled
            className="w-full font-bold focus:outline-none text-sm px-2 bg-transparent"
            placeholder="Nombre del día"
            defaultValue={data.title}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="workout-day">
      {/* <h2>{data.title}</h2>
      {data.workout_items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.info}</p>
        </div>
      ))} */}
    </div>
  );
}

export default Workouts;
