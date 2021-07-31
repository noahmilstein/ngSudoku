import { AppStore } from '../app-store.model'

export const selectDifficulty = (state: AppStore) => state.difficulty
