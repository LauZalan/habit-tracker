import type { Habit } from './types'

function HabitSummary({ habitsList }: { habitsList: Habit[] }) {

  const currentDate = new Date().toISOString().slice(0, 10)

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
            <td>{habitsList.length}</td>
            <td>{habitsList.filter((habit) => habit.completedDates.includes(currentDate)).length}</td>
            <td>{habitsList.filter((habit) => !habit.completedDates.includes(currentDate)).length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HabitSummary
