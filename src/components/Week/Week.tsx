import { Week as WeekProps } from "../../interfaces/calendarTypes"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import Day from "../Day"


interface Props {
  week: WeekProps;
  data: IWorkout[];
  truncate: boolean;
  onChangeWorkout: (workout: IWorkout) => void;
  isEditing: number | null;
  setIsEditing: (id: number | null, isEditing: boolean) => void;
  onCreateWorkout: (date: string) => void;
  saveWorkout: (workout: IWorkout) => void;
  typesMark: ITypesMark;
  categories: ICategories;
  createRestDay: (date: string) => void;
  onDeleteWorkout: (id: number[]) => void;
  onEditing: (id: number | null, cancel?: boolean) => void;

}

const Week = ({
  week,
  data,
  truncate,
  onCreateWorkout,
  isEditing,
  saveWorkout,
  onEditing,
  typesMark,
  categories,
  createRestDay,
  onDeleteWorkout
}: Props) => {

  return (
    <div className="week " id={`week-${week.id}`}>
      <div className="week-days" data-test="week-days">
        {week.days.map((day, index) => (
          <Day
            truncate={truncate}
            data={data}
            loading={false}
            key={index}
            day={day}
            isEditing={isEditing}
            setIsEditing={onEditing}
            onCreateWorkout={onCreateWorkout}
            saveWorkout={saveWorkout}
            typesMark={typesMark}
            categories={categories}
            createRestDay={createRestDay}
            onDeleteWorkout={onDeleteWorkout}
          />
        ))}
      </div>
    </div>
  )
}

export default Week
