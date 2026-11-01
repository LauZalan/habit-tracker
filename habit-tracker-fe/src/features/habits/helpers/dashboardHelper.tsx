import { isHabitScheduledOnDate } from '../../calendar/helpers/calendarHelper'

import type { Habit } from '../types'
import type { UiState } from '../reducers/dashboardUiReducer'

export function filterHabits(
  habitsList: Habit[],
  filter: UiState['filter'],
  currentDate: string,
): Habit[] {
  return habitsList
    .filter((habit) => {
      return habit.name.toLocaleLowerCase().includes(filter.text.toLocaleLowerCase())
    })
    .filter((habit) => {
      return filter.status === 'all'
        ? habit
        : filter.status === 'done'
          ? isHabitScheduledOnDate(habit, currentDate) && habit.completedDates.includes(currentDate)
          : isHabitScheduledOnDate(habit, currentDate) &&
            !habit.completedDates.includes(currentDate)
    })
}
