import dayjs from "dayjs"
import Audio from "../../../Audio"
import { IAudio } from "../../../Audio/Audio"

const DayTopRow = ({
  name,
  date,
  onUploadAudio,
  audio,
  pasteWorkout,
  setSelectAudio,
  onCreateWorkout,
}: {
  name: string
  date: string
  onUploadAudio: (date: string, file: File) => void
  audio: IAudio | undefined
  pasteWorkout: (date: string) => void
  setSelectAudio: (audio: IAudio) => void
  onCreateWorkout: () => void
}) => {
  const isToday = dayjs().format("YYYY-MM-DD") === date
  return (
    <div
      className={`day-topRow split split--nowrap  is-sticky ${isToday && "bg-yellow-400"}`}
      data-test="day-header"
      style={{ top: "-1px" }}
    >
      <div className="flex flex-row gap-5">
        {audio && <Audio setSelectAudio={setSelectAudio} audio={audio} />}
      </div>
      <div className="flex flex-row gap-1 items-center">
        <button onClick={onCreateWorkout} className="cursor-pointer">
          <div className="law paste-workout ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 fill-slate-500"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        <div onClick={() => pasteWorkout(date)} className="cursor-pointer">
          <div className="law paste-workout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-slate-500"
            >
              <path
                fillRule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="cursor-pointer">
          <label htmlFor={`audio-${date}`} className="law paste-workout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-3 h-3 fill-slate-500"
            >
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
            <input
              id={`audio-${date}`}
              onChange={(file) => {
                if (file.target.files) {
                  onUploadAudio(date, file.target.files[0])
                }
              }}
              multiple={false}
              accept="audio/*"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="tc-list-item">
          <div
            className="law day-date cursor-pointer"
            data-test="set-active-day"
          >
            <span
              data-test="day-number"
              className="day-number capitalize font-bold text-sm"
            >
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayTopRow
