import { useState, useEffect } from 'react'

import loadStoredHabits from '../helpers/loadStoredHabits'
import { HabitsContext } from './HabitsContext'

import type { Habit } from '../types'

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habitsList, setHabitsList] = useState<Habit[]>(loadStoredHabits)

  useEffect(() => {
    localStorage.setItem('habitsList', JSON.stringify(habitsList))
  }, [habitsList])

  return (
    <HabitsContext.Provider value={{ habitsList, setHabitsList }}>
      {children}
    </HabitsContext.Provider>
  )
}
