export interface Day {
  date: string
  dayName: string
  dayNumber: string
  id: number
}

export interface Week {
  id: number
  days: Day[]
}
