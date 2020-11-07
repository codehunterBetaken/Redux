import { type } from 'os';
import reducer from '../store/reducers/counter1';
import { Action, AnyAction, ReducersMapObject, Reducer } from './';

// export type StateFromReducersMapObject<M> = M extends ReducersMapObject<any, any> ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never } : never
export function combineReducers<S, A extends Action = AnyAction>(
  //TODO combineReducers 原生的重载调查
  reducers: ReducersMapObject<S, A>
): Reducer<S, A>

export default function combineReducers<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>) {
  // type CombinedState = {
  //   [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
  // }
  return function (state: S = {} as S, action: A) {
    const nextState: S = {} as S
    let key: keyof S
    for (key in reducers) {
      let reducer: Reducer<S[typeof key], A> = reducers[key]
      let nextStateForKey: S[typeof key] = reducer(state[key], action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}