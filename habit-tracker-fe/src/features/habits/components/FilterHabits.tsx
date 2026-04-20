type HabitFilterProps = {
  habitSearchText: string
  setHabitSearchText: React.Dispatch<React.SetStateAction<string>>
  setHabitStatusFilter: React.Dispatch<React.SetStateAction<string>>
}

function FilterHabits({
  habitSearchText,
  setHabitSearchText,
  setHabitStatusFilter,
}: HabitFilterProps) {
  return (
    <div>
      <h2>Search for a habit!</h2>
      <input
        value={habitSearchText}
        onChange={(e) => setHabitSearchText(e.target.value)}
        type="text"
      />
      <h2>Filter habits!</h2>
      <button onClick={() => setHabitStatusFilter('all')}>All</button>
      <button onClick={() => setHabitStatusFilter('active')}>Active</button>
      <button onClick={() => setHabitStatusFilter('done')}>Done today</button>
    </div>
  )
}

export default FilterHabits
