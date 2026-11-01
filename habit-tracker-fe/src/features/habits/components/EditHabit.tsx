import type { Habit, HabitFrequencies } from '../types'
import FrequencySelector from './FrequencySelector'

type EditHabitProps = {
  originalHabit: Habit
  editedHabit: { id: string; name: string; frequency: HabitFrequencies | null }
  setEditedHabit: (next: { id: string; name: string; frequency: HabitFrequencies | null }) => void
  setEditedHabitFrequency: (next: React.SetStateAction<HabitFrequencies | null>) => void
  editHabit: (id: string, updatedHabitName: string, updatedHabitFreqeuncy: HabitFrequencies) => void
  deleteHabit: (id: string) => void
}

function EditHabit({
  originalHabit,
  editedHabit,
  setEditedHabit,
  setEditedHabitFrequency,
  editHabit,
  deleteHabit,
}: EditHabitProps) {
  return (
    <>
      <tr>
        <td>
          <button onClick={() => deleteHabit(originalHabit.id)}>Delete</button>
        </td>
        <td>
          <button
            onClick={() =>
              !editedHabit.id || editedHabit.id !== originalHabit.id
                ? setEditedHabit({
                    id: originalHabit.id,
                    name: originalHabit.name,
                    frequency: originalHabit.frequency,
                  })
                : setEditedHabit({ id: '', name: '', frequency: null })
            }
          >
            Edit
          </button>
        </td>
      </tr>
      {originalHabit.id === editedHabit.id ? (
        <>
          <tr>
            <td colSpan={3}>Edit name</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <input
                type="text"
                value={editedHabit.name}
                onChange={(e) => setEditedHabit({ ...editedHabit, name: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Edit frequency</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <FrequencySelector
                habitFrequency={editedHabit.frequency}
                setHabitFrequency={setEditedHabitFrequency}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button
                onClick={() =>
                  editedHabit.frequency
                    ? (editHabit(originalHabit.id, editedHabit.name, editedHabit.frequency),
                      setEditedHabit({ id: '', name: '', frequency: null }))
                    : null
                }
              >
                Save
              </button>
            </td>
          </tr>
        </>
      ) : null}
    </>
  )
}

export default EditHabit
