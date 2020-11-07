import * as TYPES from '../action-types'
import { Dispatch } from '../../redux'
let actions = {
  //actionCreator 
  increment1: () => {
    return { type: TYPES.INCREMENT1 }
  },
  asyncIncrement1: () => {
    console.log(222)
    return function (dispatch: Dispatch, getState: any) {
      setTimeout(() => {
        console.log(1111)
        dispatch({ type: TYPES.INCREMENT1 })
      }, 1000)
    }
  },
  promiseIncrement1: () => {
    return {
      type: TYPES.INCREMENT1,
      payload: new Promise(function (resolve, reject) {
        setTimeout(() => {
          let result = Math.random()
          if (result > .5) {
            resolve(result)
          } else {
            reject('error')
          }
        }, 1000);
      })

    }
  },
  decrement1: () => {
    return { type: TYPES.DECREMENT1 }
  }
}
//actionCreatorMapObject
export default actions
