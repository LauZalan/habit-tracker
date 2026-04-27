import type { Habit } from '../habits/types'

export type CalendarCell = {
  id: number
  cellDate: string
  cellHabits: Habit[]
  editable: boolean
}

export type CalendarDetails = {
  year: number
  month: number
  numOfDays: number
  startDay: number
  numOfCells: number
  cells: CalendarCell[]
}
