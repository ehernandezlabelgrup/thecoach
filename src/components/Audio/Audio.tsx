export interface IAudio {
  audio_url: string
  date: string
  id?: number
  title?: string
}

interface IProps {
  audio: IAudio
  onDeleteAudio?: () => void
  setSelectAudio: (audio: IAudio) => void
}

const Audio = ({ audio, setSelectAudio }: IProps) => {
  return (
    <div className="audio absolute z-50">
      <button
        className="flex flex-row items-center"
        onClick={() => setSelectAudio(audio)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-green-700"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Audio
