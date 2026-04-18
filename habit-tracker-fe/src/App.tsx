import AddHabit from './AddHabit'
import FilterHabits from './FilterHabits'
import HabitSummary from './HabitSummary'
import HabitList from './HabitList'

import type { Habit } from './types'

import { useEffect, useState } from 'react'

import { z } from 'zod'

import './App.css'

function App() {
  const [habitsList, setHabitsList] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem('habitsList')

    if (storedHabits) {
      try {
        const habitSchema = z.object({
          id: z.uuid(),
          name: z.string(),
          completedDates: z.array(z.string())
        })

        const habitListSchema = z.array(habitSchema)

        const habits = habitListSchema.parse(JSON.parse(storedHabits))
        return habits
      } catch (error) {
        console.error(error)
        return []
      }
    } else {
      return []
    }
  })

  const [habitSearchText, setHabitSearchText] = useState('')
  const [habitStatusFilter, setHabitStatusFilter] = useState('all')

  function toggleHabitDoneToday(id: string) {
    const currentDate = new Date().toISOString().slice(0, 10)
    setHabitsList((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, completedDates: !habit.completedDates.includes(currentDate) ? [...habit.completedDates, currentDate] : habit.completedDates.filter((date)=>date !== currentDate) } : habit)),
    )
  }

  function editHabit(id: string, updatedHabit: string) {
    setHabitsList((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, name: updatedHabit } : habit)),
    )
  }

  function deleteHabit(id: string) {
    setHabitsList((prev) => prev.filter((habit) => habit.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('habitsList', JSON.stringify(habitsList))
  }, [habitsList])

  return (
    <>
      <div>
        <h1>Habit Tracker</h1>
        <AddHabit setHabitsList={setHabitsList} />
      </div>
      <div>
        <FilterHabits
          habitSearchText={habitSearchText}
          setHabitSearchText={setHabitSearchText}
          setHabitStatusFilter={setHabitStatusFilter}
        />
      </div>
      <div>
        <HabitSummary habitsList={habitsList} />
      </div>
      <div>
        <h2>Habit list</h2>
        <HabitList
          habitsList={habitsList}
          habitSearchText={habitSearchText}
          habitStatusFilter={habitStatusFilter}
          toggleHabitDoneToday={toggleHabitDoneToday}
          deleteHabit={deleteHabit}
          editHabit={editHabit}
        />
      </div>
    </>
  )
}

export default App
