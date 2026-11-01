import { useState, useEffect } from 'react'

import loadStoredHabits from '../helpers/loadStoredHabits'
import { HabitsContext } from './HabitsContext'

import type { Habit, HabitFrequencies } from '../types'

import { getLocalDateKey } from '../helpers/localDateHelper'

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

  function editHabit(
    id: string,
    updatedHabitName: string,
    updatedHabitFreqeuncy: HabitFrequencies,
  ) {
    setHabitsList((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? habit.frequency == updatedHabitFreqeuncy
            ? {
                ...habit,
                name: updatedHabitName,
              }
            : {
                ...habit,
                name: updatedHabitName,
                frequency: updatedHabitFreqeuncy,
                frequencyHistory: [
                  ...habit.frequencyHistory,
                  { effectiveFrom: getLocalDateKey(new Date()), frequency: updatedHabitFreqeuncy },
                ],
              }
          : habit,
      ),
    )
  }

  function deleteHabit(id: string) {
    setHabitsList((prev) => prev.filter((habit) => habit.id !== id))
  }

  return (
    <HabitsContext.Provider
      value={{ habitsList, setHabitsList, toggleHabitDoneOnDate, editHabit, deleteHabit }}
    >
      {children}
    </HabitsContext.Provider>
  )
}
