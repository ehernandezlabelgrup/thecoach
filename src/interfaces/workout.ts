export interface Workout {
    date: string
    warmup: string
    workout_items: WorkoutItem[]
    cooldown: string
    id: number
    title: string
    exercises: Exercise[]
}

export interface WorkoutItem {
    id: number
    info: string
    name: string
    position: number
    notes: string
}



export interface Exercise {
    id: number
    display?: string
    name: string
    video?: string
}