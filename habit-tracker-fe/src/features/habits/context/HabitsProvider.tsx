import { useState, useEffect } from 'react'

import loadStoredHabits from '../helpers/loadStoredHabits'
import { HabitsContext } from './HabitsContext'

import type { Habit } from '../types'

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habitsList, setHabitsList] = useState<Habit[]>(loadStoredHabits)

  useEffect(() => {
    localStorage.setItem('habitsList', JSON.stringify(habitsList))
  }, [habitsList])

  function toggleHabitDoneOnDate(id: string, date: string) {
    setHabitsList((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: !habit.completedDates.includes(date)
                ? [...habit.completedDates, date]
                : habit.completedDates.filter((e) => e !== date),
            }
          : habit,
      ),
    )
  }

  return (
    <HabitsContext.Provider value={{ habitsList, setHabitsList, toggleHabitDoneOnDate }}>
      {children}
    </HabitsContext.Provider>
  )
}
