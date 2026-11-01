import { createContext, useContext } from 'react'

import type { Habit, HabitFrequencies } from '../types'

type HabitsContextValue = {
  habitsList: Habit[]
  setHabitsList: React.Dispatch<React.SetStateAction<Habit[]>>
  toggleHabitDoneOnDate: (id: string, date: string) => void
  editHabit: (id: string, updatedHabitName: string, updatedHabitFreqeuncy: HabitFrequencies) => void
  deleteHabit: (id: string) => void
}

export const HabitsContext = createContext<HabitsContextValue | null>(null)

export function useHabits() {
  const context = useContext(HabitsContext)
  if (!context) throw new Error('useHabits must be used within a HabitsContextProvider')
  return context
}
