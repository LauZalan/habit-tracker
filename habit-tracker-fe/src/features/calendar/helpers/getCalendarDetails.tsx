import { getLocalDateKey } from '../../habits/helpers/localDateHelper'

import type { CalendarDetails, CalendarCell } from '../types'
import type { Habit } from '../../habits/types'

const NUMOFCELLS = 42

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
      if (habit.completedDates.includes(date)) {
        cellHabitOnDate.push(habit)
      }
    })

    const cell: CalendarCell = {
      id: cellindex,
      cellDate: date,
      cellHabits: cellHabitOnDate,
    }

    calendarDetails.cells.push(cell)
  }

  return calendarDetails
}

export default getCalendarDetails
