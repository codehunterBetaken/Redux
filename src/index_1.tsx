import { createStore, Action, AnyAction, Dispatch, Reducer, Store } from './redux'
let counterValue: HTMLElement = document.getElementById('counter-value') as HTMLElement
let incrementBtn: HTMLElement = document.getElementById('increment') as HTMLElement
let decrementBtn: HTMLElement = document.getElementById('decrement') as HTMLElement

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

interface State {
  number: number
}
let initialState: State = { number: 0 }

type CounterAction = Action<string>
// & { amount: number }
// type CounterAction = AnyAction
const reducer: Reducer<State, CounterAction> = (
  state: State = initialState,
  action: CounterAction
): State => {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 }
    case DECREMENT:
      return { number: state.number - 1 }
    default:
      return state
  }
}

let store: Store<State, CounterAction> = createStore<State, CounterAction, {}, {}>(reducer)

function render() {
  counterValue.innerHTML = store.getState().number + "";
}
render()

store.subscribe(render)

let dispatch: Dispatch<CounterAction> = store.dispatch
incrementBtn.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: INCREMENT })
})
decrementBtn.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: DECREMENT })
})