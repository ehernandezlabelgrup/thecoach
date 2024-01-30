export interface IWorkout {
  date: string
  warmup: string
  workout_items: IWorkoutItem[]
  cooldown: string
  id: number
  title: string
  exercises: Exercise[]
  rest_day?: boolean
  notes?: string
}

export interface IWorkoutItem {
  id: number
  info: string
  name: string
  position: number
  notes: string
  id_workout_category: string
  is_ranking: boolean
  min_result: string
  id_thetraktor_type_mark: string
}

export interface Exercise {
  id: number
  display?: string
  name: string
  video?: string
}

export interface ITypesMark {
  id_thetraktor_type_mark: string
  name: string
}

export interface ICategories {
  id_thetraktor_workout_category: string
  name: string
}
