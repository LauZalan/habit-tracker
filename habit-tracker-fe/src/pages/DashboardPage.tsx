import AddHabit from '../features/habits/components/AddHabit'
import FilterHabits from '../features/habits/components/FilterHabits'
import HabitSummary from '../features/habits/components/HabitSummary'
import HabitList from '../features/habits/components/HabitList'

import type { HabitListColumn } from '../features/habits/types'

import EditHabit from '../features/habits/components/EditHabit'
import Checkbox from '../features/habits/components/Checkbox'
import { useDashboard } from '../features/habits/hooks/useDashboard'

function DashboardPage() {
  const {
    currentDate,
    habits,
    ui,
    filteredHabits,
    habitsToday,
    handleOnEditedHabitChange,
    handleOnEditedHabitFrequencyChange,
    handleOnSearchAndStatusChange,
  } = useDashboard()

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
              editHabit={habits.editHabit}
              deleteHabit={habits.deleteHabit}
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
              toggleHabitDone={habits.toggleHabitDoneOnDate}
            />
          )}
        />
      </div>
    </>
  )
}

export default DashboardPage
