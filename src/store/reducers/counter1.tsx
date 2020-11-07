import { Reducer, AnyAction } from '../../redux'
import * as TYPES from '../action-types'
export interface Count1State {
  number: number
}
let initialState: Count1State = { number: 0 }

const reducer: Reducer<Count1State, AnyAction> = (
  state: Count1State = initialState,
  action: AnyAction
): Count1State => {
  switch (action.type) {
    case TYPES.INCREMENT1:
      return { number: state.number + 1 }
    case TYPES.DECREMENT1:
      return { number: state.number - 1 }
    default:
      return state
  }
}
export default reducer