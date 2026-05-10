import { useReducer } from 'react'

import { useHabits } from '../features/habits/context/HabitsContext'

import AddHabit from '../features/habits/components/AddHabit'
import FilterHabits from '../features/habits/components/FilterHabits'
import HabitSummary from '../features/habits/components/HabitSummary'
import HabitList from '../features/habits/components/HabitList'

import { getLocalDateKey } from '../features/habits/helpers/localDateHelper'
import { isHabitScheduledOnDate } from '../features/calendar/helpers/getCalendarDetails'

import { filterUiReducer } from '../features/habits/reducers/dashboardUiReducer'

import type { Habit, HabitFrequencies } from '../features/habits/types'
import type { UiState } from '../features/habits/reducers/dashboardUiReducer'

import { initialUiState } from '../features/habits/reducers/dashboardUiReducer'

function DashboardPage() {
  const habits = useHabits()
  const currentDate = getLocalDateKey(new Date())

  const [ui, dispatch] = useReducer(filterUiReducer, initialUiState)

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

  function filterHabits(habitsList: Habit[], filter: UiState['filter']): Habit[] {
    return habitsList
      .filter((habit) => {
        return habit.name.toLocaleLowerCase().includes(filter.text.toLocaleLowerCase())
      })
      .filter((habit) => {
        return filter.status === 'all'
          ? habit
          : filter.status === 'done'
            ? isHabitScheduledOnDate(habit, currentDate) &&
              habit.completedDates.includes(currentDate)
            : isHabitScheduledOnDate(habit, currentDate) &&
              !habit.completedDates.includes(currentDate)
      })
  }

  function toggleHabitDoneToday(id: string) {
    const currentDate = getLocalDateKey(new Date())
    habits.setHabitsList((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: !habit.completedDates.includes(currentDate)
                ? [...habit.completedDates, currentDate]
                : habit.completedDates.filter((date) => date !== currentDate),
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
    habits.setHabitsList((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? habit.frequency === updatedHabitFreqeuncy
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
    habits.setHabitsList((prev) => prev.filter((habit) => habit.id !== id))
  }

  const filteredHabits = filterHabits(habits.habitsList, ui.filter)

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <AddHabit setHabitsList={habits.setHabitsList} />
      </div>
      <div>
        <FilterHabits filter={ui.filter} setHabitFilter={handleOnSearchAndStatusChange} />
      </div>
      <div>
        <HabitSummary habitsList={habits.habitsList} />
      </div>
      <div>
        <h2>Habit list</h2>
        <HabitList
          habitsList={filteredHabits}
          editedHabit={ui.editedHabit}
          setEditedHabit={handleOnEditedHabitChange}
          setEditedHabitFrequency={handleOnEditedHabitFrequencyChange}
          toggleHabitDoneToday={toggleHabitDoneToday}
          deleteHabit={deleteHabit}
          editHabit={editHabit}
        />
      </div>
    </>
  )
}

export default DashboardPage
