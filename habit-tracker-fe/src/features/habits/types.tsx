export type Habit = {
  id: string
  name: string
  completedDates: string[]
  dateAdded: string
  frequency: HabitFrequencies
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type HabitFrequencies = { type: 'daily' } | { type: 'weekly'; days: Weekday[] }
