import { Droppable } from "react-beautiful-dnd"
import WorkoutItems from "../WorkoutItems"
import { ICategories, IWorkoutItem } from "../../../../../../interfaces/workout"

interface IProps {
  data: IWorkoutItem[]
  categories: ICategories[]
  id: number
}

const WorkoutItemsContent = ({ data, categories, id }: IProps) => {
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
