import { useState } from 'react'
import type { Habit, HabitFrequencies } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'
import { isHabitScheduledOnDate } from '../../calendar/helpers/getCalendarDetails'
import FrequencySelector from './FrequencySelector'

type HabitListProps = {
  habitsList: Habit[]
  habitSearchText: string
  habitStatusFilter: string
  toggleHabitDoneToday: (id: string) => void
  deleteHabit: (id: string) => void
  editHabit: (id: string, updatedHabitName: string, updatedHabitFreqeuncy: HabitFrequencies) => void
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
  const [editedHabitFrequency, setEditedHabitFrequency] = useState<HabitFrequencies | null>(null)

  const currentDate = getLocalDateKey(new Date())

  const allHabits = habitsList
    .filter((habit) => {
      return habit.name.toLocaleLowerCase().includes(habitSearchText.toLocaleLowerCase())
    })
    .filter((habit) => {
      return habitStatusFilter === 'all'
        ? habit
        : habitStatusFilter === 'done'
          ? isHabitScheduledOnDate(habit, currentDate) && habit.completedDates.includes(currentDate)
          : isHabitScheduledOnDate(habit, currentDate) &&
            !habit.completedDates.includes(currentDate)
    })
    .map((habit) => (
      <tbody key={habit.id}>
        <tr>
          <td>{habit.name}</td>
          <td>
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </td>
          <td>
            <button
              onClick={() =>
                !editedHabitId || editedHabitId !== habit.id
                  ? (setEditedHabitId(habit.id),
                    setEditedHabitName(habit.name),
                    setEditedHabitFrequency(habit.frequency))
                  : setEditedHabitId('')
              }
            >
              Edit
            </button>
          </td>
        </tr>
        {habit.id === editedHabitId ? (
          <>
            <tr>
              <td colSpan={3}>Edit name</td>
            </tr>
            <tr>
              <td colSpan={3}>
                <input
                  type="text"
                  value={editedHabitName}
                  onChange={(e) => setEditedHabitName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>Edit frequency</td>
            </tr>
            <tr>
              <td colSpan={3}>
                <FrequencySelector
                  habitFrequency={editedHabitFrequency}
                  setHabitFrequency={setEditedHabitFrequency}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <button
                  onClick={() =>
                    editedHabitFrequency
                      ? (editHabit(habit.id, editedHabitName, editedHabitFrequency),
                        setEditedHabitId(''),
                        setEditedHabitName(''),
                        setEditedHabitFrequency(null))
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

  const habitsToday = habitsList
    .filter((habit) => {
      return habit.name.toLocaleLowerCase().includes(habitSearchText.toLocaleLowerCase())
    })
    .filter((habit) => {
      return habitStatusFilter === 'all'
        ? habit
        : habitStatusFilter === 'done'
          ? isHabitScheduledOnDate(habit, currentDate) && habit.completedDates.includes(currentDate)
          : isHabitScheduledOnDate(habit, currentDate) &&
            !habit.completedDates.includes(currentDate)
    })
    .map((habit) =>
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
