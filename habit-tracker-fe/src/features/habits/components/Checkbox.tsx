import type { Habit } from '../types'

type CheckboxProps = {
  habit: Habit
  currentDate: string
  toggleHabitDoneToday: (id: string) => void
}

function Checkbox({ habit, currentDate, toggleHabitDoneToday }: CheckboxProps) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={habit.completedDates.includes(currentDate)}
          onChange={() => toggleHabitDoneToday(habit.id)}
        />
      </td>
    </tr>
  )
}

export default Checkbox
