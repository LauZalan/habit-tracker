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
    { id: '2', label: 'Completion' },
    { id: '3', label: 'Current Streak' },
  ]

  return (
    <div>
      <h1>Analytics</h1>
      <HabitList
        habitsList={habits}
        columns={HabitsColumns}
        renderAttachment={(habit) => <HabitAnalytics habit={habit} currentDate={currentDate} />}
      />
    </div>
  )
}

export default AnalyticsPage
