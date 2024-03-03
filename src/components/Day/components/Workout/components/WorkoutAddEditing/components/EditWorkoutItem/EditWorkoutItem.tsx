/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react"
import { createLetterFromNumber } from "../../../../../../../../utils/calendar"
import WorkoutExercise from "../../../WorkoutExercise"
import {
  ICategories,
  ITypesMark,
} from "../../../../../../../../interfaces/workout"
import TextareaInput from "../../../../../../../TextareaInput"

interface IProps {
  register: any
  index: number
  categories: ICategories[]
  typesMark: ITypesMark[]
  getValues: any
  setValue: any
  errors: any
  URL_BASE: string
}

const EditWorkoutItem = ({
  register,
  index,
  categories,
  typesMark,
  getValues,
  setValue,
  errors,
  URL_BASE,
}: IProps) => {
  const [is_rank, setIsRank] = useState(
    getValues(`workout_items.${index}.is_ranking`) || false,
  )
  const letter = createLetterFromNumber(index)
  const [focustTitle, setFocusTitle] = useState(false)

  const onChangeExercise = (values: string) => {
    setValue(`workout_items.${index}.exercises`, values)
  }

  const category_options = categories?.map((item: ICategories) => ({
    value: item.id_thetraktor_workout_category,
    text: item.name,
  }))

  const types_mark = typesMark?.map((item: ITypesMark) => ({
    value: item.id_thetraktor_type_mark,
    text: item.name,
  }))

  const exercises = useMemo(() => {
    return getValues(`workout_items.${index}.exercises`)
  }, [])
  return (
    <div className="">
      <div className="px-4 pt-4 flex gap-1 flex-row">
        <div className="flex gap-1">
          <label htmlFor={`rank.${index}`} className="flex flex-row relative">
            <div
              className={`${is_rank ? "bg-blue-300" : "bg-gray-300"} cursor-pointer flex items-center justify-center w-6 h-6 rounded`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-3 h-3 ${is_rank ? "fill-blue-600" : "fill-gray-600"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              {...register(`workout_items.${index}.is_ranking`)}
              className="abolute hidden"
              type="checkbox"
              onChange={(e) => {
                setIsRank(e.target.checked)
                setValue(`workout_items.${index}.is_ranking`, e.target.checked)
              }}
              id={`rank.${index}`}
            />
          </label>
          <select
            {...register(`workout_items.${index}.id_thetraktor_type_mark`)}
            className="w-24 text-left !h-[25px] uppercase outline-none !px-2 !font-semibold !text-xs border border-gray-300  focus:bg-blue-50 bg-white rounded !py-1"
          >
            <option value={0}>Sin marca</option>

            {types_mark.map((item: any) => (
              <option value={item.value}>{item.text}</option>
            ))}
          </select>

          <div className="w-24">
            <input
              {...register(`workout_items.${index}.min_result`)}
              defaultValue={0}
              placeholder="Objetivo"
              className="w-full !h-[25px] !leading-0 uppercase outline-none !px-2 font-semibold !text-xs border border-gray-300 text-right focus:bg-blue-50 bg-white rounded !py-1"
            />
          </div>
        </div>
      </div>
      <div className="px-4 pt-1">
        <select
          {...register(`workout_items.${index}.id_workout_category`)}
          className="w-full text-left !h-[25px] !leading-0 uppercase outline-none !px-2 !font-semibold !text-xs border border-gray-300  focus:bg-blue-50 bg-white !rounded !py-1"
        >
          <option value={0}>Sin categoría</option>

          {category_options.map((item: any) => (
            <option value={Number(item.value)}>{item.text}</option>
          ))}
        </select>
      </div>
      <div className="px-4"></div>

      <div>
        <div
          className={`flex pl-4 flex-row items-center ${
            focustTitle && "border-t border-b border-blue-400"
          } ${errors?.workout_items?.[index]?.title && "bg-red-100"}`}
        >
          <div className="font-bold py-2 uppercase text-xs">{letter})</div>
          <input
            {...register(`workout_items.${index}.name`, {
              required: true,
            })}
            onBlur={() => setFocusTitle(false)}
            onFocus={() => setFocusTitle(true)}
            className=" !outline-none !pl-2 !border-none  !pr-2 !py-2 !w-full !font-bold !bg-transparent  !text-xs"
            placeholder="Ejercicio"
          />
        </div>
        <div className="">
          <TextareaInput
            register={register}
            name={`workout_items.${index}.info`}
            error={errors?.workout_items?.[index]?.info}
            placeholder="Sets, reps, weight, etc."
            required={true}
          />
        </div>
        <div className="border-t border-gray-300">
          <TextareaInput
            className="italic "
            register={register}
            name={`workout_items.${index}.notes`}
            error={errors?.workout_items?.[index]?.notes}
            placeholder="Notas del entrenamiento"
          />
        </div>
        <div className="px-4">
          <WorkoutExercise
            URL_BASE={URL_BASE}
            /* @ts-ignore */
            onChange={onChangeExercise}
            data={exercises}
          />
        </div>
      </div>
    </div>
  )
}

export default EditWorkoutItem
