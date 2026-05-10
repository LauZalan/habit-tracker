import { getLocalDateKey } from '../helpers/localDateHelper'
import type { Habit } from '../types'
import { isHabitScheduledOnDate } from '../../calendar/helpers/getCalendarDetails'

function HabitSummary({ habitsList }: { habitsList: Habit[] }) {
  const currentDate = getLocalDateKey(new Date())

  return (
    <div>
      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>All</th>
            <th>Done today</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {habitsList.filter((habit) => isHabitScheduledOnDate(habit, currentDate)).length}
            </td>
            <td>
              {habitsList.filter((habit) => habit.completedDates.includes(currentDate)).length}
            </td>
            <td>
              {
                habitsList.filter(
                  (habit) =>
                    isHabitScheduledOnDate(habit, currentDate) &&
                    !habit.completedDates.includes(currentDate),
                ).length
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HabitSummary
