import type { Habit } from '../types'

type CheckboxProps = {
  habit: Habit
  currentDate: string
  toggleHabitDone: (id: string, date: string) => void
}

function Checkbox({ habit, currentDate, toggleHabitDone }: CheckboxProps) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={habit.completedDates.includes(currentDate)}
          onChange={() => toggleHabitDone(habit.id, currentDate)}
        />
      </td>
    </tr>
  )
}

export default Checkbox
