import { useState } from 'react'

import { useHabits } from '../features/habits/context/HabitsContext'

import AddHabit from '../features/habits/components/AddHabit'
import FilterHabits from '../features/habits/components/FilterHabits'
import HabitSummary from '../features/habits/components/HabitSummary'
import HabitList from '../features/habits/components/HabitList'

import { getLocalDateKey } from '../features/habits/helpers/localDateHelper'

function DashboardPage() {
  const habits = useHabits()

  const [habitSearchText, setHabitSearchText] = useState('')
  const [habitStatusFilter, setHabitStatusFilter] = useState('all')

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

  function editHabit(id: string, updatedHabit: string) {
    habits.setHabitsList((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, name: updatedHabit } : habit)),
    )
  }

  function deleteHabit(id: string) {
    habits.setHabitsList((prev) => prev.filter((habit) => habit.id !== id))
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <AddHabit setHabitsList={habits.setHabitsList} />
      </div>
      <div>
        <FilterHabits
          habitSearchText={habitSearchText}
          setHabitSearchText={setHabitSearchText}
          setHabitStatusFilter={setHabitStatusFilter}
        />
      </div>
      <div>
        <HabitSummary habitsList={habits.habitsList} />
      </div>
      <div>
        <h2>Habit list</h2>
        <HabitList
          habitsList={habits.habitsList}
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

export default DashboardPage
