import { useState } from "react"
import { createLetterFromNumber } from "../../../../../../../../utils/calendar"
import { TESelect } from "tw-elements-react"

const EditWorkoutItem = ({
  register,
  index,
  categories,
  typesMark,
  getValues,
  setValue,
  errors
}) => {
  const letter = createLetterFromNumber(index)
  const [focustTitle, setFocusTitle] = useState(false)

  const category_options = categories?.map((item) => ({
    value: item.id_thetraktor_workout_category,
    text: item.name,
  }))

  const types_mark = typesMark?.map((item) => ({
    value: item.id_thetraktor_type_mark,
    text: item.name,
  }))
  

  return (
    <div className="">
      <div className="px-4 pt-4 flex gap-1 flex-row">
        <TESelect
        
          className="flex-1"
          name={`workout_items.${index}.id_thetraktor_type_mark`}
          onValueChange={value => {
            setValue(`workout_items.${index}.id_thetraktor_type_mark`, value?.value)
          }}
          defaultValue={0}
          data={types_mark}
          size="sm"
          clearBtn
          preventFirstSelection
          label="Marca"
        />
        <div className="w-24">
          <input
            {...register(`workout_items.${index}.min_result`)}
            defaultValue={0}
            placeholder="Objetivo"
            className="w-full h-full uppercase outline-none px-2 font-semibold text-xs border border-gray-300 text-right focus:bg-blue-50 bg-white rounded py-1"
          />
        </div>
      </div>
      <div className="px-4 pt-1">
        <TESelect
          {...register(`workout_items.${index}.id_workout_category`)}
          data={category_options}
          size="sm"
          clearBtn
          preventFirstSelection
          label="Categoría"
        />
      </div>
      <div className="px-4">
        <input
          {...register(`workout_items.${index}.is_ranking`)}
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="rank"
        />
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="rank"
        >
          Ranking
        </label>
      </div>

      <div>
        <div
          className={`flex pl-4 flex-row ${
            focustTitle && "border-t border-b border-blue-400"
          } ${errors?.workout_items?.[index]?.title && "bg-red-100"}`
        }
        >
          <div className="font-bold py-2 uppercase text-xs">{letter})</div>
          <input
            {...register(`workout_items.${index}.name`,{
              required: true
            })}
            onBlur={() => setFocusTitle(false)}
            onFocus={() => setFocusTitle(true)}
            className=" outline-none pl-2 border-none  pr-2 py-2 w-full font-bold bg-transparent  text-xs"
            placeholder="Ejercicio"
          />
        </div>
        <div className="">
          <textarea
            {...register(`workout_items.${index}.info`, {
              required: true,
          
            })}
            className={`px-4 py-2 rounded-none outline-none bg-transparent border-gray-100 focus:border-t focus:border-b focus:border-blue-500 text-xs h-28 resize-none ${errors?.workout_items?.[index]?.info && "bg-red-100"}`}
            placeholder="Sets, reps, weight, etc."
          />
        </div>
        <div className="border-t border-gray-300">
          <textarea
            {...register(`workout_items.${index}.notes`)}
            className="px-4 italic py-2 rounded-none outline-none bg-transparent border-gray-100 focus:border-t focus:border-b focus:border-blue-500 text-xs h-28 resize-none "
            placeholder="Notas del ejercicio (opcional)"
          />
        </div>
      </div>
    </div>
  )
}

export default EditWorkoutItem
