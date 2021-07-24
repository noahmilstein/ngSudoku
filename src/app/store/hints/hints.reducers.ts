import { createReducer, on } from '@ngrx/store'
import { gamePadAppendUsedHints } from '../../components/game-pad/game-pad.actions'
import { Cell } from '../../models/cell.model'
import { difficultyEffectsResetHints } from '../difficulty/difficulty.actions'

export const hintsReducer = createReducer(
  [] as Cell[],
  on(difficultyEffectsResetHints, (_) => []),
  on(gamePadAppendUsedHints, (usedHints, { hint }) => [...usedHints, hint])
)
