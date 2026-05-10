import type { HabitFrequencies, Weekday } from '../types'
import type React from 'react'

const weekdays = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
]

type FrequencySelectorProps = {
  habitFrequency: HabitFrequencies | null
  setHabitFrequency: React.Dispatch<React.SetStateAction<HabitFrequencies | null>>
}

function FrequencySelector({ habitFrequency, setHabitFrequency }: FrequencySelectorProps) {
  function toggleSelectedDay(selectedDay: Weekday) {
    setHabitFrequency((prev) =>
      prev?.type === 'weekly'
        ? prev.days.includes(selectedDay)
          ? { type: 'weekly', days: prev.days.filter((day) => day !== selectedDay) }
          : { type: 'weekly', days: [...prev.days, selectedDay] }
        : prev,
    )
  }

  function onChangeFrequency(frequencyType: string) {
    if (frequencyType === 'daily') {
      setHabitFrequency({ type: 'daily' })
    } else if (frequencyType === 'weekly') {
      setHabitFrequency({ type: 'weekly', days: [] })
    }
  }

  return (
    <>
      <select
        value={habitFrequency?.type ?? ''}
        onChange={(e) => {
          onChangeFrequency(e.target.value)
        }}
      >
        <option value={'daily'}>Daily</option>
        <option value={'weekly'}>Weekly</option>
      </select>
      <br />
      {habitFrequency?.type === 'weekly' ? (
        <>
          <p>Select days!</p>
          {weekdays.map((day) => (
            <label key={day.value}>
              {day.label}
              <input
                type="checkbox"
                value={day.value}
                checked={habitFrequency.days.includes(day.value as Weekday)}
                onChange={() => toggleSelectedDay(day.value as Weekday)}
              />
              <br />
            </label>
          ))}
        </>
      ) : null}
    </>
  )
}
export default FrequencySelector
