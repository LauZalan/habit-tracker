import { useState } from 'react'

import type { Habit, HabitFrequencies } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'
import FrequencySelector from './FrequencySelector'

type AddHabitProps = {
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
}

function AddHabit({ setHabitsList }: AddHabitProps) {
  const [habitName, setHabitName] = useState('')
  const [completedDate, setCompletedDates] = useState<string[]>([])

  const [habitFrequency, setHabitFrequency] = useState<HabitFrequencies | null>(null)

  function handleOnAddHabit() {
    const trimmedHabit = habitName.trim()

    if (trimmedHabit && habitFrequency) {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: trimmedHabit,
        completedDates: completedDate,
        dateAdded: getLocalDateKey(new Date()),
        frequency: habitFrequency,
      }

      setHabitsList((prev) => [...prev, newHabit])
      setHabitName('')
      setCompletedDates([])
      setHabitFrequency(null)
    }
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
        <FrequencySelector habitFrequency={habitFrequency} setHabitFrequency={setHabitFrequency} />
      </div>
      <div>
        <button onClick={handleOnAddHabit}>Add habit</button>
      </div>
    </div>
  )
}

export default AddHabit
