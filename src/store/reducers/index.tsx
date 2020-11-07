// import { combineReducers, AnyAction, ReducersMapObject, Reducer } from '../../redux'
import { combineReducers, AnyAction, ReducersMapObject, Reducer } from '../../redux'
import counter1, { Count1State } from './counter1'
import counter2, { Count2State } from './counter2'

export interface CombinedState {
  counter1: Count1State,
  counter2: Count2State
}

let reducers: ReducersMapObject<CombinedState, AnyAction> = { counter1, counter2 }
let rootReducers: Reducer<CombinedState, AnyAction> = combineReducers<CombinedState, AnyAction>(reducers)
export default rootReducers