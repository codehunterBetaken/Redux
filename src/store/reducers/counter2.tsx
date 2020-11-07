import { Reducer, AnyAction } from '../../redux'
import * as TYPES from '../action-types'
export interface Count2State {
  number: number
}
let initialState: Count2State = { number: 0 }

const reducer: Reducer<Count2State, AnyAction> = (
  state: Count2State = initialState,
  action: AnyAction
): Count2State => {
  switch (action.type) {
    case TYPES.INCREMENT2:
      return { number: state.number + 1 }
    case TYPES.DECREMENT2:
      return { number: state.number - 1 }
    default:
      return state
  }
}
export default reducer