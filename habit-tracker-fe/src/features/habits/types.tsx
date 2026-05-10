export type Habit = {
  id: string
  name: string
  completedDates: string[]
  dateAdded: string
  frequency: HabitFrequencies
  frequencyHistory: FrequencyHistoryEntry[]
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type HabitFrequencies = { type: 'daily' } | { type: 'weekly'; days: Weekday[] }

export type FrequencyHistoryEntry = {
  effectiveFrom: string
  frequency: HabitFrequencies
}
