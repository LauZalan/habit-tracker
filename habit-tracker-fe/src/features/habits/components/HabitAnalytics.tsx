import { isHabitScheduledOnDate } from '../../calendar/helpers/getCalendarDetails'
import { getLocalDateKey } from '../helpers/localDateHelper'

import type { Habit } from '../types'

type HabitAnalyticsProps = {
  habit: Habit
  currentDate: string
}

function getCompletionCount(habit: Habit, currentDate: string): number {
  let completionCount = 0

  const start = new Date(habit.dateAdded)
  const end = new Date(currentDate)

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      completionCount++
    }
  }
  return completionCount
}

function getCurrentStreak(habit: Habit, currentDate: string): number {
  let currentStreak = 0

  const start = new Date(currentDate)
  const end = new Date(habit.dateAdded)

  for (let date = start; date >= end; date.setDate(date.getDate() - 1)) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      if (habit.completedDates.includes(getLocalDateKey(date))) {
        currentStreak++
      } else {
        return currentStreak
      }
    }
  }

  return currentStreak
}

function HabitAnalytics({ habit, currentDate }: HabitAnalyticsProps) {
  return (
    <>
      <tr>
        <td>{habit.completedDates.length + '/' + getCompletionCount(habit, currentDate)}</td>
        <td>{getCurrentStreak(habit, currentDate)}</td>
      </tr>
    </>
  )
}

export default HabitAnalytics
