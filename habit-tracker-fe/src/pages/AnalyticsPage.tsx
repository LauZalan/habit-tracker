import { useHabits } from '../features/habits/context/HabitsContext'

import HabitList from '../features/habits/components/HabitList'

import type { HabitListColumn } from '../features/habits/types'
import { getLocalDateKey } from '../features/habits/helpers/localDateHelper'
import HabitAnalytics from '../features/habits/components/HabitAnalytics'

function AnalyticsPage() {
  const habits = useHabits().habitsList
  const currentDate = getLocalDateKey(new Date())

  const HabitsColumns: HabitListColumn[] = [
    { id: '1', label: 'Habit' },
    { id: '2', label: 'Overall completion' },
    { id: '3', label: 'Previous 7 shcduled completion' },
    { id: '4', label: 'Last 7 shcduled completion' },
    { id: '5', label: 'Current streak' },
  ]

  return (
    <div>
      <h1>Analytics</h1>
      <h2>Weekly habits</h2>
      <HabitList
        habitsList={habits.filter((habit) => habit.frequency.type == 'weekly')}
        columns={HabitsColumns}
        renderAttachment={(habit) => <HabitAnalytics habit={habit} currentDate={currentDate} />}
      />
      <br />
      <h2>Daily habits</h2>
      <HabitList
        habitsList={habits.filter((habit) => habit.frequency.type == 'daily')}
        columns={HabitsColumns}
        renderAttachment={(habit) => <HabitAnalytics habit={habit} currentDate={currentDate} />}
      />
    </div>
  )
}

export default AnalyticsPage
