import { createContext, useContext } from 'react'

import type { Habit } from '../types'

type HabitsContextValue = {
  habitsList: Habit[]
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
  toggleHabitDoneOnDate: (id: string, date: string) => void
}

export const HabitsContext = createContext<HabitsContextValue | null>(null)

export function useHabits() {
  const context = useContext(HabitsContext)
  if (!context) throw new Error('useHabits msut be used within a HabitsContextProvider')
  return context
}
