import type { Habit, HabitListColumn } from '../types'
import type { ReactElement } from 'react'

type HabitListProps = {
  habitsList: Habit[]
  columns: HabitListColumn[]
  renderAttachment: ((habit: Habit) => ReactElement) | (() => null)
}

function HabitList({ habitsList, columns, renderAttachment }: HabitListProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
        </tr>
      </thead>
      {habitsList.map((habit) => (
        <tbody key={habit.id}>
          <tr>
            <td rowSpan={2}>{habit.name}</td>
          </tr>
          {renderAttachment(habit)}
        </tbody>
      ))}
    </table>
  )
}

export default HabitList
