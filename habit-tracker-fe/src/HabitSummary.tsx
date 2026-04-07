import type { Habit } from './types'

function HabitSummary({ habitsList }: { habitsList: Habit[] }) {
  return (
    <div>
      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>All</th>
            <th>Done</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{habitsList.length}</td>
            <td>{habitsList.filter((habit) => habit.done).length}</td>
            <td>{habitsList.filter((habit) => !habit.done).length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HabitSummary
