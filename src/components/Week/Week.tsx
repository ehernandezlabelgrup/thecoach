import { Week as WeekProps } from "../../interfaces/calendarTypes"
import { ICategories, ITypesMark, IWorkout } from "../../interfaces/workout"
import { IAudio } from "../Audio/Audio"
import Day from "../Day"

interface Props {
  week: WeekProps
  data: IWorkout[]
  onChangeWorkout: (workout: IWorkout) => void
  isEditing: number | null
  setIsEditing: (id: number | null, isEditing: boolean) => void
  onCreateWorkout: (date: string) => void
  saveWorkout: (workout: IWorkout) => void
  typesMark: ITypesMark[]
  categories: ICategories[]
  createRestDay: (date: string) => void
  onDeleteWorkout: (id: number[]) => void
  onEditing: (id: number | null, cancel?: boolean) => void
  onUploadAudio: (date: string, file: File) => void
  audios: IAudio[]
  onCoyWorkout: (id: number) => void
  onSelect: (id: number) => void
  selecteds: number[]
  pasteWorkout: (date: string) => void
  URL_BASE: string
  setSelectAudio: (audio: IAudio) => void
}

const Week = ({
  week,
  data,
  onCreateWorkout,
  isEditing,
  saveWorkout,
  onEditing,
  typesMark,
  categories,
  createRestDay,
  onDeleteWorkout,
  onUploadAudio,
  audios,
  onCoyWorkout,
  onSelect,
  selecteds,
  pasteWorkout,
  URL_BASE,
  setSelectAudio,
}: Props) => {
  return (
    <div className="week " id={`week-${week.id}`}>
      <div className="week-days" data-test="week-days">
        {week.days.map((day, index) => (
          <Day
            setSelectAudio={setSelectAudio}
            URL_BASE={URL_BASE}
            data={data}
            loading={false}
            key={index}
            day={day}
            onCoyWorkout={onCoyWorkout}
            audios={audios}
            isEditing={isEditing}
            setIsEditing={onEditing}
            onCreateWorkout={onCreateWorkout}
            saveWorkout={saveWorkout}
            typesMark={typesMark}
            categories={categories}
            createRestDay={createRestDay}
            onDeleteWorkout={onDeleteWorkout}
            onUploadAudio={onUploadAudio}
            onSelect={onSelect}
            selecteds={selecteds}
            pasteWorkout={pasteWorkout}
          />
        ))}
      </div>
    </div>
  )
}

export default Week
