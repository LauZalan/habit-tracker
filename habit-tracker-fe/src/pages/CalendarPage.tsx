import DrawCalendar from '../features/calendar/DrawCalendar'
import { useCalendar } from '../features/calendar/hooks/useCalendar'

function CalendarPage() {
  const { habits, year, month, detailedDateId, stepMonth, toggleDetailedDateId, calendarDetails } =
    useCalendar()

  return (
    <div>
      <div>
        <h1>Calendar view</h1>
        <h2>
          {year}. {month + 1 < 10 ? '0' + (month + 1) : month + 1}.
        </h2>
        <button onClick={() => stepMonth(-1)}>Prev month</button>
        <button onClick={() => stepMonth(1)}>Next month</button>
      </div>
      <div>
        <DrawCalendar
          calendarDetails={calendarDetails}
          detailedDateId={detailedDateId}
          toggleDetailedDateId={toggleDetailedDateId}
          toggleHabitDoneOnDate={habits.toggleHabitDoneOnDate}
        />
      </div>
    </div>
  )
}

export default CalendarPage
