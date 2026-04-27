import { useState } from 'react'
import type { Habit } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'

type HabitListProps = {
  habitsList: Habit[]
  habitSearchText: string
  habitStatusFilter: string
  toggleHabitDoneToday: (id: string) => void
  deleteHabit: (id: string) => void
  editHabit: (id: string, updatedHabit: string) => void
}

function HabitList({
  habitsList,
  habitSearchText,
  habitStatusFilter,
  toggleHabitDoneToday,
  deleteHabit,
  editHabit,
}: HabitListProps) {
  const [editedHabitId, setEditedHabitId] = useState('')
  const [editedHabitName, setEditedHabitName] = useState('')

  const currentDate = getLocalDateKey(new Date())

  const items = habitsList
    .filter((habit) => {
      return habit.name.toLocaleLowerCase().includes(habitSearchText.toLocaleLowerCase())
    })
    .filter((habit) => {
      return habitStatusFilter === 'all'
        ? habit
        : habitStatusFilter === 'done'
          ? habit.completedDates.includes(currentDate)
          : !habit.completedDates.includes(currentDate)
    })
    .map((habit) => (
      <tbody key={habit.id}>
        <tr>
          <td>{habit.name}</td>
          <td>
            <input
              checked={habit.completedDates.includes(currentDate)}
              onChange={() => toggleHabitDoneToday(habit.id)}
              type="checkbox"
            />
          </td>
          <td>
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </td>
          <td>
            <button
              onClick={() =>
                !editedHabitId || editedHabitId !== habit.id
                  ? (setEditedHabitId(habit.id), setEditedHabitName(habit.name))
                  : setEditedHabitId('')
              }
            >
              Edit
            </button>
          </td>
        </tr>
        {habit.id === editedHabitId ? (
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                value={editedHabitName}
                onChange={(e) => setEditedHabitName(e.target.value)}
              />
            </td>
            <td colSpan={2}>
              <button
                onClick={() => (
                  editHabit(habit.id, editedHabitName),
                  setEditedHabitId(''),
                  setEditedHabitName('')
                )}
              >
                Save
              </button>
            </td>
          </tr>
        ) : null}
      </tbody>
    ))

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Done today</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        {items}
      </table>
    </div>
  )
}

export default HabitList
