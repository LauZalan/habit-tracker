import { useState } from 'react'

import type { FrequencyHistoryEntry, Habit, HabitFrequencies } from '../types'
import { getLocalDateKey } from '../helpers/localDateHelper'
import FrequencySelector from './FrequencySelector'

type AddHabitProps = {
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
}

function AddHabit({ setHabitsList }: AddHabitProps) {
  const [habitName, setHabitName] = useState('')
  const [habitFrequency, setHabitFrequency] = useState<HabitFrequencies | null>({ type: 'daily' })

  function handleOnAddHabit() {
    const trimmedHabit = habitName.trim()

    if (trimmedHabit && habitFrequency) {
      const freqencyHistory: FrequencyHistoryEntry[] = [
        {
          effectiveFrom: getLocalDateKey(new Date()),
          frequency: habitFrequency,
        },
      ]

      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: trimmedHabit,
        completedDates: [],
        dateAdded: getLocalDateKey(new Date()),
        frequency: habitFrequency,
        frequencyHistory: freqencyHistory,
      }

      setHabitsList((prev) => [...prev, newHabit])
      setHabitName('')
      setHabitFrequency({ type: 'daily' })
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
