
export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}
export type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S

//难点
// export type Dispatch<A extends Action = AnyAction> = (action: A) => A
export type Dispatch<A = AnyAction> = <T extends A>(action: T) => T

export type Listener = () => void

export type Subscribe = (linstener: Listener) => Unsubscribe

export type Unsubscribe = () => void

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>,
  getState(): S,
  subscribe(listener: Listener): Unsubscribe
}


//在类型处定义泛型使用时必须申明，在函数前定义泛型在使用时定义，可申明，不申明就默认转换
// export interface StoreCreator<S, A extends Action<any>, Ext, StateExt>{(
//   reducer: Reducer<S, A>,
//   preloadedState?: S
// ): Store<S, A>}

export type StoreCreator =
  <S, A extends Action<any>, Ext, StateExt>(
    reducer: Reducer<S, A>,
    preloadedState?: S
  ) => Store<S, A>

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}

export interface Middleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
  > {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<AnyAction>
  ) => (action: any) => any
}

export type StoreEnhancer = (
  next: StoreEnhancerStoreCreator
) => StoreEnhancerStoreCreator


export type StoreEnhancerStoreCreator = <
  S = any,
  A extends Action = AnyAction
  >(
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S, A>

