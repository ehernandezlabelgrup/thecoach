/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
  register: any
  name: string
  error: boolean
  className?: string
}

const TextareaInput = ({ register, name, error, className = "" }: IProps) => {
  return (
    <textarea
      {...register(`${name}`, {
        required: true,
      })}
      className={`!px-4 !py-2 !rounded-none text-gray-400 !outline-none !bg-transparent !border-gray-100 focus:!border-t focus:!border-b focus:!border-blue-500 !text-[12px] !h-28 !resize-none ${error && "!bg-red-100"} ${className}`}
      placeholder="Sets, reps, weight, etc."
    />
  )
}

export default TextareaInput
