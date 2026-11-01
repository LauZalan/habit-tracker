import { isHabitScheduledOnDate } from '../../calendar/helpers/calendarHelper'
import { getLocalDateKey, parseLocalDate } from '../helpers/localDateHelper'

import type { Habit } from '../types'

type HabitAnalyticsProps = {
  habit: Habit
  currentDate: string
}

function getCompletionCount(habit: Habit, currentDate: string): number {
  let completionCount = 0

  const start = parseLocalDate(habit.dateAdded)
  const end = parseLocalDate(currentDate)

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      completionCount++
    }
  }
  return completionCount
}

function getCurrentStreak(habit: Habit, currentDate: string): number {
  let currentStreak = 0

  const start = parseLocalDate(currentDate)
  const end = parseLocalDate(habit.dateAdded)

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

function getThirtyDayConsistency(habit: Habit, currentDate: string): string {
  let thirtyDayCompletion = 0
  let thirtyDayOccurance = 0

  const start = parseLocalDate(currentDate)
  const thirtyDayOffset = parseLocalDate(currentDate)
  thirtyDayOffset.setDate(start.getDate() - 29)

  for (let date = start; date >= thirtyDayOffset; date.setDate(date.getDate() - 1)) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      thirtyDayOccurance++
      if (habit.completedDates.includes(getLocalDateKey(date))) {
        thirtyDayCompletion++
      }
    }
  }

  if (thirtyDayOccurance == 0) {
    return '-'
  }

  return ((thirtyDayCompletion / thirtyDayOccurance) * 100).toFixed(2) + ' %'
}

function getMostMissedWeekday(habit: Habit, currentDate: string): string {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const missedOccurancesByDay = new Array<number>(7).fill(0)

  const start = parseLocalDate(currentDate)
  const end = parseLocalDate(habit.dateAdded)

  for (let date = start; date >= end; date.setDate(date.getDate() - 1)) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      if (!habit.completedDates.includes(getLocalDateKey(date))) {
        missedOccurancesByDay[(date.getDay() + 6) % 7]++
      }
    }
  }

  if (Math.max(...missedOccurancesByDay) == 0) {
    return '-'
  }

  return weekdays[missedOccurancesByDay.indexOf(Math.max(...missedOccurancesByDay))]
}

function HabitAnalytics({ habit, currentDate }: HabitAnalyticsProps) {
  const completionCount = getCompletionCount(habit, currentDate)
  const thirtyDayConsistency = getThirtyDayConsistency(habit, currentDate)
  const mostMissedWeekday = getMostMissedWeekday(habit, currentDate)

  return (
    <>
      <tr>
        <td>{habit.completedDates.length + '/' + completionCount}</td>
        <td>{thirtyDayConsistency}</td>
        <td>{mostMissedWeekday}</td>
        <td>{getCurrentStreak(habit, currentDate)}</td>
      </tr>
    </>
  )
}

export default HabitAnalytics
