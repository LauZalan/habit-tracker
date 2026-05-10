import z from 'zod'

function loadStoredHabits() {
  const storedHabits = localStorage.getItem('habitsList')

  if (storedHabits) {
    try {
      const habitDailyFrequencySchema = z.object({
        type: z.literal('daily'),
      })

      const habitWeeklyFrequencySchema = z.object({
        type: z.literal('weekly'),
        days: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])),
      })

      const freqencyHistorySchema = z.object({
        effectiveFrom: z.string(),
        frequency: habitDailyFrequencySchema.or(habitWeeklyFrequencySchema),
      })

      const habitSchema = z.object({
        id: z.uuid(),
        name: z.string(),
        completedDates: z.array(z.string()),
        dateAdded: z.string(),
        frequency: habitDailyFrequencySchema.or(habitWeeklyFrequencySchema),
        frequencyHistory: z.array(freqencyHistorySchema),
      })

      const habitListSchema = z.array(habitSchema)

      const habits = habitListSchema.parse(JSON.parse(storedHabits))
      return habits
    } catch (error) {
      console.error(error)
      return []
    }
  } else {
    return []
  }
}

export default loadStoredHabits
