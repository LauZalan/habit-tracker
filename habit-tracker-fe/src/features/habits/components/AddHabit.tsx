import { useState } from 'react'

import type { Habit, HabitFrequencies, Weekday } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'

type AddHabitProps = {
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
}

const weekdays = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
]

function AddHabit({ setHabitsList }: AddHabitProps) {
  const [habitName, setHabitName] = useState('')
  const [habitFrequency, setHabitFrequency] = useState<HabitFrequencies | null>(null)
  const [isWeekly, setIsWeekly] = useState(false)
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([])
  const [completedDate, setCompletedDates] = useState<string[]>([])

  function handleOnAddHabit() {
    const trimmedHabit = habitName.trim()
    let habitFrequencyToSave: HabitFrequencies = { type: 'daily' }

    if (habitFrequency?.type === 'daily') {
      habitFrequencyToSave = {
        type: habitFrequency.type,
      }
    } else if (habitFrequency?.type === 'weekly') {
      habitFrequencyToSave = {
        type: habitFrequency.type,
        days: selectedDays as Weekday[],
      }
    }

    if (trimmedHabit) {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: trimmedHabit,
        completedDates: completedDate,
        dateAdded: getLocalDateKey(new Date()),
        frequency: habitFrequencyToSave,
      }

      setHabitsList((prev) => [...prev, newHabit])
      setHabitName('')
      setCompletedDates([])
      setHabitFrequency(null)
      setSelectedDays([])
      setIsWeekly(false)
    }
  }

  function toggleSelectedDay(day: Weekday) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((selectedDay) => selectedDay !== day) : [...prev, day],
    )
  }

  return (
    <div>
      <h2>Add a habit!</h2>
      <div>
        <label htmlFor="habitName">Habit name</label>
        <br />
        <input value={habitName} onChange={(e) => setHabitName(e.target.value)} />
        <br />
        <label htmlFor="habitFrequency">Habit frequency</label>
        <br />
        <select
          value={habitFrequency?.type ?? ''}
          onChange={(e) => {
            if (e.target.value === 'daily') {
              setHabitFrequency({ type: 'daily' })
              setSelectedDays([])
              setIsWeekly(false)
            }

            if (e.target.value === 'weekly') {
              setHabitFrequency({ type: 'weekly', days: [] })
              setIsWeekly(true)
            }
          }}
        >
          <option value={'daily'}>Daily</option>
          <option value={'weekly'}>Weekly</option>
        </select>
        <br />
        {isWeekly ? (
          <>
            <p>Select days!</p>
            {weekdays.map((day) => (
              <label key={day.value}>
                {day.label}
                <input
                  type="checkbox"
                  value={day.value}
                  checked={selectedDays.includes(day.value as Weekday)}
                  onChange={() => toggleSelectedDay(day.value as Weekday)}
                />
                <br />
              </label>
            ))}
          </>
        ) : null}
        <br />
      </div>
      <div>
        <button onClick={handleOnAddHabit}>Add habit</button>
      </div>
    </div>
  )
}

export default AddHabit
