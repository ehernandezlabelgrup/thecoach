import { ProgramSession } from "../../interfaces";
import Workout from "../Workout/Workout";

interface IProps {
  data: ProgramSession[];
  date: string;
  enable: boolean;
}

function Workouts({ data, enable }: IProps) {
  return data?.map((item, index) => {
    return (
      <Workout index={index} key={String(item.id)} {...item} enable={enable} />
    );
  });
}

export default Workouts;
