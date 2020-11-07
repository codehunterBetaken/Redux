import { $CombinedState } from 'redux'
import {
  createStore, applyMiddleware, StoreEnhancer, StoreCreator,
  Store, StoreEnhancerStoreCreator, MiddlewareAPI, Dispatch, AnyAction
} from '../redux'
import rootReducer, { CombinedState } from './reducers'

// let logger1 = function (api: any) {
//   return function (next: any) {
//     return function (action: any) {
//       console.log('变更前的老状态1', api.getState())
//       next(action)
//       console.log('变更后的新状态1', api.getState())
//     }
//   }
// }
// let logger2 = function (api: any) {
//   return function (next: any) {
//     return function (action: any) {
//       console.log('变更前的老状态2', api.getState())
//       next(action)
//       console.log('变更后的新状态2', api.getState())
//     }
//   }
// }
// let logger3 = function (api: any) {
//   return function (next: any) {
//     return function (action: any) {
//       console.log('变更前的老状态3', api.getState())
//       //api.dispatch(action) 为什么不可以这样写？ api.dispatch是最外层的dispatch
//       next(action)
//       console.log('变更后的新状态3', api.getState())
//     }
//   }
// }
// let storeEnhancer: StoreEnhancer = applyMiddleware<{}, CombinedState>(logger1, logger2, logger3)
let logger = function (api: MiddlewareAPI) {
  return function (next: Dispatch<AnyAction>) {
    return function (action: AnyAction) {
      console.log('变更前的老状态1', api.getState())
      next(action)
      console.log('变更后的新状态1', api.getState())
    }
  }
}

//redux-trunk
let trunk = function (api: MiddlewareAPI) {
  return function (next: Dispatch<AnyAction>) {
    return function (action: any) {
      if (typeof action === 'function') {
        return action(api.dispatch, api.getState)
      }
      return next(action)

    }
  }
}

function isPromise(obj: any): boolean {
  return !!obj && typeof obj === 'object' && typeof obj.then === 'object'
}

//redux-promise
let promise = function (api: MiddlewareAPI) {
  return function (next: Dispatch<AnyAction>) {
    return function (action: any) {
      if (isPromise(action.payload)) {
        action.payload.then((result: any) => api.dispatch({ ...action, payload: result }),
          (error: any) => {
            api.dispatch({ ...action, payload: error, error: true })
            return Promise.reject(error)
          })
      } else {
        next(action)
      }

    }
  }
}
let storeEnhancer: StoreEnhancer = applyMiddleware<{}, CombinedState>(trunk, promise, logger)
let storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)
let store: Store<CombinedState> = storeEnhancerStoreCreator<CombinedState>(rootReducer)
// const store = createStore(rootReducer)
export default store