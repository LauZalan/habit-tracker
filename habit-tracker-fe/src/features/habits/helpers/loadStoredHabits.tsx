import z from 'zod'

function loadStoredHabits() {
  const storedHabits = localStorage.getItem('habitsList')

  if (storedHabits) {
    try {
      const habitSchema = z.object({
        id: z.uuid(),
        name: z.string(),
        completedDates: z.array(z.string()),
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
