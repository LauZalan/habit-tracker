import type { CalendarDetails } from './types'

const ROWS = 6
const COLS = 7

function DrawCalendar({ calendarDetails }: { calendarDetails: CalendarDetails }) {
  return (
    <table>
      <tbody>
        {[...Array(ROWS).keys()].map((rows) => (
          <tr key={rows}>
            {[...Array(COLS).keys()].map((cols) => (
              <td
                key={rows * COLS + cols}
                style={{
                  width: '100px',
                  height: '100px',
                  borderStyle: 'solid',
                  borderColor: 'gray',
                  borderWidth: '1px',
                }}
              >
                {calendarDetails.cells[rows * COLS + cols].cellDate}
                {calendarDetails.cells[rows * COLS + cols].cellHabits.map((habit) => (
                  <div key={habit.id}>
                    <p>{habit.name}</p>
                  </div>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DrawCalendar
