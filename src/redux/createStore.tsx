import { StoreCreator, Action, Store, Reducer, Dispatch, Listener, Subscribe, Unsubscribe } from './'

const createStore: StoreCreator = <S, A extends Action<any>, Ext, StateExt>(reducer: Reducer<S, A>,
  preloadedState?: S): Store<S, A> => {

  let currentState: S = preloadedState as S
  let currentListeners: Array<Listener> = []
  function getState(): S {
    return currentState
  }
  const dispatch: Dispatch<A> = <T extends A>(action: T): T => {
    currentState = reducer(currentState, action)
    currentListeners.forEach(l => l())
    return action//重要
  }
  //给currentState付初始值
  dispatch({ type: '@@REDUX/INIT' } as A)
  let subscribe: Subscribe = (linstener: Listener) => {
    currentListeners.push(linstener)
    return function () {
      let index: number = currentListeners.indexOf(linstener)
      currentListeners.splice(index)
    }
  }
  const store: Store<S, A> = {
    getState,
    dispatch,
    subscribe
  }

  return store
}

export default createStore