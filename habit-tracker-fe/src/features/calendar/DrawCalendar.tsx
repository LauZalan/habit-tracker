import { Fragment } from 'react/jsx-runtime'
import type { CalendarDetails } from './types'

const ROWS = 6
const COLS = 7

type DrawCalendarProps = {
  calendarDetails: CalendarDetails
  detailedDateId: number | null
  detailedRow: number | null
  setDetailedDateId: React.Dispatch<React.SetStateAction<number | null>>
  setDetailedRow: React.Dispatch<React.SetStateAction<number | null>>
  toggleHabitDoneOnDate: (id: string, date: string) => void
}

function DrawCalendar({
  calendarDetails,
  detailedDateId,
  detailedRow,
  setDetailedDateId,
  setDetailedRow,
  toggleHabitDoneOnDate,
}: DrawCalendarProps) {
  function toggleDetailedDateId(id: number) {
    if (detailedDateId === null || id !== detailedDateId) {
      setDetailedDateId(id)
    } else {
      setDetailedDateId(null)
    }
  }

  return (
    <table>
      <tbody>
        {[...Array(ROWS).keys()].map((row) => (
          <Fragment key={row}>
            <tr>
              {[...Array(COLS).keys()].map((col) => (
                <td
                  key={row * COLS + col}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderStyle: 'solid',
                    borderColor: 'gray',
                    borderWidth: '1px',
                  }}
                >
                  {calendarDetails.cells[row * COLS + col].cellDate}
                  {calendarDetails.cells[row * COLS + col].cellHabits.length > 0 ? (
                    <div>
                      <p>{calendarDetails.cells[row * COLS + col].cellHabits.length} items</p>
                      <button
                        onClick={() => (
                          toggleDetailedDateId(row * COLS + col),
                          setDetailedRow(row)
                        )}
                      >
                        More
                      </button>
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
            {detailedDateId !== null && detailedRow === row ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderStyle: 'solid',
                    borderColor: 'gray',
                    borderWidth: '1px',
                  }}
                >
                  {calendarDetails.cells[detailedDateId].cellDate}
                  {calendarDetails.cells[detailedDateId].editable
                    ? calendarDetails.cells[detailedDateId].cellHabits.map((habit) => (
                        <Fragment key={habit.id}>
                          <br />
                          <label>{habit.name}</label>
                          <input
                            type="checkbox"
                            checked={habit.completedDates.includes(
                              calendarDetails.cells[detailedDateId].cellDate,
                            )}
                            onChange={() =>
                              toggleHabitDoneOnDate(
                                habit.id,
                                calendarDetails.cells[detailedDateId].cellDate,
                              )
                            }
                          />
                        </Fragment>
                      ))
                    : calendarDetails.cells[detailedDateId].cellHabits.map((habit) => (
                        <p key={habit.id}>{habit.name}</p>
                      ))}
                </td>
              </tr>
            ) : null}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default DrawCalendar
