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

function getLastPrevSevenDaysCompletion(habit: Habit, currentDate: string): number[] {
  let lastSevenDaysComp = 0
  let prevSevenDaysComp = 0

  const date = new Date(currentDate)
  let endCounter = 0

  while (endCounter != 14) {
    if (isHabitScheduledOnDate(habit, getLocalDateKey(date))) {
      if (habit.completedDates.includes(getLocalDateKey(date))) {
        if (endCounter < 7) {
          lastSevenDaysComp++
        } else {
          prevSevenDaysComp++
        }
      }
      endCounter++
    }

    date.setDate(date.getDate() - 1)
  }

  return [lastSevenDaysComp, prevSevenDaysComp]
}

function HabitAnalytics({ habit, currentDate }: HabitAnalyticsProps) {
  const completionCount = getCompletionCount(habit, currentDate)
  const lastPrev = getLastPrevSevenDaysCompletion(habit, currentDate)
  const lastSevenDaysComp = lastPrev[0]
  const prevSevenDaysComp = lastPrev[1]

  return (
    <>
      <tr>
        <td>
          {habit.completedDates.length +
            '/' +
            completionCount +
            ' (' +
            ((habit.completedDates.length / completionCount) * 100).toFixed(2) +
            '%)'}
        </td>
        <td>{prevSevenDaysComp + '/7 (' + ((prevSevenDaysComp / 7) * 100).toFixed(2) + '%)'}</td>
        <td>{lastSevenDaysComp + '/7 (' + ((lastSevenDaysComp / 7) * 100).toFixed(2) + '%)'}</td>
        <td>{getCurrentStreak(habit, currentDate)}</td>
      </tr>
    </>
  )
}

export default HabitAnalytics
