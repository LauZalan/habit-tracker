type HabitFilterProps = {
  filter: { text: string; status: 'all' | 'done' | 'active' }
  setHabitFilter: (next: { text: string; status: 'all' | 'done' | 'active' }) => void
}

function FilterHabits({ filter, setHabitFilter }: HabitFilterProps) {
  return (
    <div>
      <h2>Search for a habit!</h2>
      <input
        value={filter.text}
        onChange={(e) => setHabitFilter({ ...filter, text: e.target.value })}
        type="text"
      />
      <h2>Filter habits!</h2>
      <button onClick={() => setHabitFilter({ ...filter, status: 'all' })}>All</button>
      <button onClick={() => setHabitFilter({ ...filter, status: 'active' })}>Active</button>
      <button onClick={() => setHabitFilter({ ...filter, status: 'done' })}>Done today</button>
    </div>
  )
}

export default FilterHabits
