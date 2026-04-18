import { useState } from 'react'
import type { Habit } from './types'

type AddHabitProps = {
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
}

function AddHabit({ setHabitsList }: AddHabitProps) {
  const [habit, setHabit] = useState('')

  function handleOnClick() {
    const trimmedHabit = habit.trim()

    if (trimmedHabit) {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: trimmedHabit,
        completedDates: []
      }

      setHabitsList((prev) => [...prev, newHabit])
      setHabit('')
    }
  }

  return (
    <div>
      <h2>Add a habit!</h2>
      <div>
        <input value={habit} onChange={(e) => setHabit(e.target.value)} />
      </div>
      <div>
        <button onClick={handleOnClick}>Add</button>
      </div>
    </div>
  )
}

export default AddHabit
