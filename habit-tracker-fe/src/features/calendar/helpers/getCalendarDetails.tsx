import { getLocalDateKey } from '../../habits/helpers/localDateHelper'

import type { CalendarDetails, CalendarCell } from '../types'
import type { Habit, Weekday } from '../../habits/types'

const NUMOFCELLS = 42

const weekdays: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export function isHabitScheduledOnDate(habit: Habit, dateString: string): boolean {
  for (let i = habit.frequencyHistory.length - 1; i >= 0; i--) {
    const freqencyHistoryEntry = habit.frequencyHistory[i]
    if (dateString >= freqencyHistoryEntry.effectiveFrom) {
      if (freqencyHistoryEntry.frequency.type === 'daily') {
        return true
      } else if (freqencyHistoryEntry.frequency.type === 'weekly') {
        const dayOfTheWeek = (new Date(dateString).getDay() + 6) % 7
        if (freqencyHistoryEntry.frequency.days.includes(weekdays[dayOfTheWeek])) {
          return true
        } else {
          return false
        }
      }
    } else {
      continue
    }
  }
  return false
}

function getCalendarDetails(year: number, month: number, habits: Habit[]): CalendarDetails {
  const calendarDetails: CalendarDetails = {
    year: year,
    month: month,
    numOfDays: new Date(year, month + 1, 0).getDate(),
    startDay: new Date(year, month, 1).getDay(),
    numOfCells: NUMOFCELLS,
    cells: new Array<CalendarCell>(),
  }

  const mondayStartDay = (calendarDetails.startDay + 6) % 7

  for (let cellindex = 0; cellindex < calendarDetails.numOfCells; cellindex++) {
    const day = cellindex - mondayStartDay + 1
    const date = getLocalDateKey(new Date(calendarDetails.year, calendarDetails.month, day))

    const cellHabitOnDate: Habit[] = new Array<Habit>()

    habits.forEach((habit) => {
      if (isHabitScheduledOnDate(habit, date)) {
        cellHabitOnDate.push(habit)
      }
    })

    const cell: CalendarCell = {
      id: cellindex,
      cellDate: date,
      cellHabits: cellHabitOnDate,
      editable: false,
    }

    if (getLocalDateKey(new Date()) >= cell.cellDate) {
      cell.editable = true
    }

    calendarDetails.cells.push(cell)
  }

  return calendarDetails
}

export default getCalendarDetails
