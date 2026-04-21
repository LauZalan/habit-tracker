import { useState } from 'react'

import type { Habit } from '../types'

type AddHabitProps = {
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
}

function AddHabit({ setHabitsList }: AddHabitProps) {
  const [habitName, setHabitName] = useState('')
  const [habitCompletedOn, setHabitCompletedOn] = useState('')
  const [completedDate, setCompletedDates] = useState<string[]>([])

  function handleOnAddHabit() {
    const trimmedHabit = habitName.trim()

    if (trimmedHabit) {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: trimmedHabit,
        completedDates: completedDate,
      }

      setHabitsList((prev) => [...prev, newHabit])
      setHabitName('')
      setCompletedDates([])
    }
  }

  function handleOnAddDateCompletedOn() {
    setCompletedDates((prev) => [...prev, habitCompletedOn])
  }

  return (
    <div>
      <h2>Add a habit!</h2>
      <div>
        <label htmlFor="habitName">Habit name</label>
        <br />
        <input value={habitName} onChange={(e) => setHabitName(e.target.value)} />
        <br />
      </div>
      {/* add past completion dates for testing */}
      <div>
        <label htmlFor="habitCompletedOn">Completed on</label>
        <br />
        <input type="date" onChange={(e) => setHabitCompletedOn(e.target.value)} />
        <br />
        <button onClick={handleOnAddDateCompletedOn}>Add date</button>
      </div>
      {completedDate.length !== 0
        ? completedDate.map((date, index) => (
            <ul key={`${date}-${index}`}>
              <li>{date}</li>
            </ul>
          ))
        : null}
      <div>
        <button onClick={handleOnAddHabit}>Add habit</button>
      </div>
    </div>
  )
}

export default AddHabit
