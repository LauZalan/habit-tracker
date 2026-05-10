import { useState } from 'react'

import { useHabits } from '../features/habits/context/HabitsContext'
import DrawCalendar from '../features/calendar/DrawCalendar'
import getCalendarDetails from '../features/calendar/helpers/getCalendarDetails'

function CalendarPage() {
  const habits = useHabits()

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const [detailedDateId, setDetailedDateId] = useState<number | null>(null)
  const [detailedRow, setDetailedRow] = useState<number | null>(null)

  function stepMonth(currentMonth: number, offset: number) {
    setDetailedRow(null)
    if (currentMonth + offset > 11) {
      setYear(year + 1)
      setMonth(0)
    } else if (currentMonth + offset < 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(currentMonth + offset)
    }
  }

  return (
    <div>
      <div>
        <h1>Calendar view</h1>
        <h2>
          {year}. {month + 1 < 10 ? '0' + (month + 1) : month + 1}.
        </h2>
        <button onClick={() => stepMonth(month, -1)}>Prev month</button>
        <button onClick={() => stepMonth(month, 1)}>Next month</button>
      </div>
      <div>
        <DrawCalendar
          calendarDetails={getCalendarDetails(year, month, habits.habitsList)}
          detailedDateId={detailedDateId}
          detailedRow={detailedRow}
          setDetailedDateId={setDetailedDateId}
          setDetailedRow={setDetailedRow}
          toggleHabitDoneOnDate={habits.toggleHabitDoneOnDate}
        />
      </div>
    </div>
  )
}

export default CalendarPage
