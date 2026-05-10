import type { Habit, HabitFrequencies } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'
import { isHabitScheduledOnDate } from '../../calendar/helpers/getCalendarDetails'
import FrequencySelector from './FrequencySelector'
import type React from 'react'

type HabitListProps = {
  habitsList: Habit[]
  editedHabit: { id: string; name: string; frequency: HabitFrequencies | null }
  setEditedHabit: (next: { id: string; name: string; frequency: HabitFrequencies | null }) => void
  setEditedHabitFrequency: (next: React.SetStateAction<HabitFrequencies | null>) => void
  toggleHabitDoneToday: (id: string) => void
  deleteHabit: (id: string) => void
  editHabit: (id: string, updatedHabitName: string, updatedHabitFreqeuncy: HabitFrequencies) => void
}

function HabitList({
  habitsList,
  editedHabit,
  setEditedHabit,
  setEditedHabitFrequency,
  toggleHabitDoneToday,
  deleteHabit,
  editHabit,
}: HabitListProps) {
  const currentDate = getLocalDateKey(new Date())

  const allHabits = habitsList.map((habit) => (
    <tbody key={habit.id}>
      <tr>
        <td>{habit.name}</td>
        <td>
          <button onClick={() => deleteHabit(habit.id)}>Delete</button>
        </td>
        <td>
          <button
            onClick={() =>
              !editedHabit.id || editedHabit.id !== habit.id
                ? setEditedHabit({
                    id: habit.id,
                    name: habit.name,
                    frequency: habit.frequency,
                  })
                : setEditedHabit({ id: '', name: '', frequency: null })
            }
          >
            Edit
          </button>
        </td>
      </tr>
      {habit.id === editedHabit.id ? (
        <>
          <tr>
            <td colSpan={3}>Edit name</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <input
                type="text"
                value={editedHabit.name}
                onChange={(e) => setEditedHabit({ ...editedHabit, name: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Edit frequency</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <FrequencySelector
                habitFrequency={editedHabit.frequency}
                setHabitFrequency={setEditedHabitFrequency}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button
                onClick={() =>
                  editedHabit.frequency
                    ? (editHabit(habit.id, editedHabit.name, editedHabit.frequency),
                      setEditedHabit({ id: '', name: '', frequency: null }))
                    : null
                }
              >
                Save
              </button>
            </td>
          </tr>
        </>
      ) : null}
    </tbody>
  ))

  const habitsToday = habitsList.map((habit) =>
    isHabitScheduledOnDate(habit, currentDate) ? (
      <tbody key={habit.id}>
        <tr>
          <td>{habit.name}</td>
          <td>
            <input
              type="checkbox"
              checked={habit.completedDates.includes(currentDate)}
              onChange={() => toggleHabitDoneToday(habit.id)}
            ></input>
          </td>
        </tr>
      </tbody>
    ) : null,
  )

  return (
    <div>
      <h2>All habits</h2>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        {allHabits}
      </table>
      <h2>Habits today</h2>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Done today</th>
          </tr>
        </thead>
        {habitsToday}
      </table>
    </div>
  )
}

export default HabitList
