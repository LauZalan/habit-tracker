import { useReducer } from 'react'

import { useHabits } from '../features/habits/context/HabitsContext'

import AddHabit from '../features/habits/components/AddHabit'
import FilterHabits from '../features/habits/components/FilterHabits'
import HabitSummary from '../features/habits/components/HabitSummary'
import HabitList from '../features/habits/components/HabitList'

import { getLocalDateKey } from '../features/habits/helpers/localDateHelper'
import { isHabitScheduledOnDate } from '../features/calendar/helpers/getCalendarDetails'

import { filterUiReducer } from '../features/habits/reducers/dashboardUiReducer'

import type { Habit, HabitFrequencies, HabitListColumn } from '../features/habits/types'
import type { UiState } from '../features/habits/reducers/dashboardUiReducer'

import { initialUiState } from '../features/habits/reducers/dashboardUiReducer'
import EditHabit from '../features/habits/components/EditHabit'
import Checkbox from '../features/habits/components/Checkbox'

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
  const habitsToday = habits.habitsList.filter((habit) =>
    isHabitScheduledOnDate(habit, currentDate),
  )

  const allHabitsColumns: HabitListColumn[] = [
    { id: '1', label: 'Habit' },
    { id: '2', label: 'Delete' },
    { id: '3', label: 'Edit' },
  ]

  const todayHabitsColumns: HabitListColumn[] = [
    { id: '1', label: 'Habit' },
    { id: '2', label: 'Done' },
  ]

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
      <h2>Habit list</h2>
      <div>
        <h3>All habits</h3>
        <HabitList
          habitsList={filteredHabits}
          columns={allHabitsColumns}
          renderAttachment={(habit) => (
            <EditHabit
              originalHabit={habit}
              editedHabit={ui.editedHabit}
              setEditedHabit={handleOnEditedHabitChange}
              setEditedHabitFrequency={handleOnEditedHabitFrequencyChange}
              editHabit={editHabit}
              deleteHabit={deleteHabit}
            />
          )}
        />
      </div>
      <div>
        <h3>Habits Today</h3>
        <HabitList
          habitsList={habitsToday}
          columns={todayHabitsColumns}
          renderAttachment={(habit) => (
            <Checkbox
              habit={habit}
              currentDate={currentDate}
              toggleHabitDoneToday={toggleHabitDoneToday}
            />
          )}
        />
      </div>
    </>
  )
}

export default DashboardPage
