import { useReducer } from 'react'
import { useHabits } from '../context/HabitsContext'
import { dashboardUiReducer, initialUiState } from '../reducers/dashboardUiReducer'
import { getLocalDateKey } from '../helpers/localDateHelper'
import { filterHabits } from '../helpers/dashboardHelper'
import { isHabitScheduledOnDate } from '../../calendar/helpers/calendarHelper'

import type { HabitFrequencies } from '../types'
import type { UiState } from '../reducers/dashboardUiReducer'

export function useDashboard() {
  const currentDate = getLocalDateKey(new Date())

  const habits = useHabits()
  const [ui, dispatch] = useReducer(dashboardUiReducer, initialUiState)

  function handleOnSearchAndStatusChange(payload: UiState['filter']) {
    dispatch({ type: 'search/set', payload: payload })
  }

  function handleOnEditedHabitChange(payload: UiState['editedHabit']) {
    dispatch({ type: 'editHabit/set', payload: payload })
  }

  function handleOnEditedHabitFrequencyChange(next: React.SetStateAction<HabitFrequencies | null>) {
    const nextFrequency = typeof next === 'function' ? next(ui.editedHabit.frequency) : next

    dispatch({
      type: 'editHabit/set',
      payload: { ...ui.editedHabit, frequency: nextFrequency },
    })
  }

  const filteredHabits = filterHabits(habits.habitsList, ui.filter, currentDate)
  const habitsToday = filteredHabits.filter((habit) => isHabitScheduledOnDate(habit, currentDate))

  return {
    currentDate,
    habits,
    ui,
    filteredHabits,
    habitsToday,
    handleOnEditedHabitChange,
    handleOnEditedHabitFrequencyChange,
    handleOnSearchAndStatusChange,
  }
}
