import { useState } from 'react'

import { useHabits } from '../features/habits/context/HabitsContext'

type CalendarDetails = {
  year: number
  month: number
  numOfDays: number
  startDay: number
  numOfCells: number
}

function CalendarPage() {
  const habits = useHabits()

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  function getCalendarDetails(year: number, month: number): CalendarDetails {
    const calendarDetails: CalendarDetails = {
      year: year,
      month: month,
      numOfDays: new Date(year, month + 1, 0).getDate(),
      startDay: new Date(year, month, 1).getDay(),
      numOfCells: 42,
    }

    return calendarDetails
  }

  function drawCalendar(calendarDetails: CalendarDetails) {
    return (
      <table>
        <tbody>
          {[...Array(calendarDetails.numOfCells / 7).keys()].map((x, xindex) => (
            <tr key={x}>
              {[...Array(calendarDetails.numOfCells / 6)].map((y, yindex) => (
                <td
                  style={{
                    width: '100px',
                    height: '100px',
                    borderStyle: 'solid',
                    borderColor: 'gray',
                    borderWidth: '1px',
                  }}
                  key={y}
                >
                  {xindex.toString() + (yindex + 1).toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const calendar = drawCalendar(getCalendarDetails(year, month))

  return (
    <>
      <div>
        <h1>Calendar view</h1>
        <h2>
          {year}. {month < 10 ? '0' + month : month}.
        </h2>
        <button onClick={() => setMonth(month - 1)}>Prev month</button>
        <button onClick={() => setMonth(month + 1)}>Next month</button>
      </div>
      <div>{calendar}</div>
    </>
  )
}

export default CalendarPage
