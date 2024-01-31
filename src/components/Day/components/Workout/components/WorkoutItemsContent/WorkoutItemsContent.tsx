import { Droppable } from "react-beautiful-dnd"
import WorkoutItems from "../WorkoutItems"
import { ICategories, IWorkoutItem } from "../../../../../../interfaces/workout"

interface IProps {
  data: IWorkoutItem[]
  categories: ICategories[]
  id: number
  URL_BASE: string
}

const WorkoutItemsContent = ({ data, categories, id, URL_BASE }: IProps) => {
  return (
    <Droppable droppableId={`${id.toString()}`} type="workout_item">
      {(provided) => (
        <div
          id="ember644"
          className="workout-items sortable-objects ember-view"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {data?.map((item, index) => (
            <WorkoutItems
              URL_BASE={URL_BASE}
              categories={categories}
              index={index}
              key={item?.id.toString()}
              data={item}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default WorkoutItemsContent
