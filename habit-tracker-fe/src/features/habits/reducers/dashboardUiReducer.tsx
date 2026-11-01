import type { HabitFrequencies } from '../types'

export type UiState = {
  filter: { text: string; status: 'all' | 'done' | 'active' }
  editedHabit: { id: string; name: string; frequency: HabitFrequencies | null }
}

export const initialUiState: UiState = {
  filter: { text: '', status: 'all' },
  editedHabit: { id: '', name: '', frequency: null },
}

type UiAction =
  | { type: 'search/set'; payload: UiState['filter'] }
  | { type: 'editHabit/set'; payload: UiState['editedHabit'] }

export function filterUiReducer(state: UiState, action: UiAction): UiState {
  switch (action.type) {
    case 'search/set':
      return { ...state, filter: action.payload }
    case 'editHabit/set':
      return { ...state, editedHabit: action.payload }
    default:
      return state
  }
}
