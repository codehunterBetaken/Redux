import compose from './compose'
import { Middleware, MiddlewareAPI, Action, StoreEnhancer, StoreCreator, Reducer, Dispatch, Store } from './'

export function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer

export default function applyMiddleware<Ext, S>(...middlewares: Middleware<any, S, any>[]): StoreEnhancer {

  return (createStore: StoreCreator) => <S, A extends Action>(reducer: Reducer<S, A>): Store<S, A> => {
    let store = createStore(reducer)
    let dispatch: Dispatch
    const middlewareAPI: MiddlewareAPI<Dispatch, S> = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    const chain = middlewares.map((middleware: any) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    return { ...store, dispatch }
  }
}