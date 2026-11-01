import { useHabits } from '../../habits/context/HabitsContext'
import { useState } from 'react'

import { getCalendarDetails } from '../helpers/calendarHelper'

export function useCalendar() {
  const habits = useHabits()

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const calendarDetails = getCalendarDetails(year, month, habits.habitsList)

  const [detailedDateId, setDetailedDateId] = useState<number | null>(null)

  function stepMonth(offset: number) {
    setDetailedDateId(null)
    if (month + offset > 11) {
      setYear(year + 1)
      setMonth(0)
    } else if (month + offset < 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month + offset)
    }
  }

  function toggleDetailedDateId(id: number) {
    if (detailedDateId === null || id !== detailedDateId) {
      setDetailedDateId(id)
    } else {
      setDetailedDateId(null)
    }
  }

  return {
    habits,
    year,
    month,
    detailedDateId,
    stepMonth,
    toggleDetailedDateId,
    calendarDetails,
  }
}
