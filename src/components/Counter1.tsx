import React from 'react'
// import { Unsubscribe, bindActionCreators, Action } from '../redux'
// import store from '../store'
import actions from '../store/actions/counter1'
import { connect } from '../react-redux'
import { CombinedState } from '../store/reducers/'
import { Count1State } from '../store/reducers/counter1'
import * as TYPES from '../store/action-types'
import { AnyAction, Dispatch } from '../redux'


// interface Props { }
// interface State {
//   number: number
// }

// let boundActions = bindActionCreators(actions, store.dispatch)
// increment = bindActionCreators<Action, Dispatch<Action>>(increment, store.dispatch)
// decrement = bindActionCreators<Action, Dispatch<Action>>(decrement, store.dispatch)
type Props = ReturnType<typeof mapStateToProps> & typeof actions

export class Counter1 extends React.Component<Props> {
  // unsubscribe: Unsubscribe
  // constructor(props: Props) {
  //   super(props)
  //   this.state = { number: store.getState().counter1.number }
  // }
  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     this.setState({ number: store.getState().counter1.number })
  //   })
  // }
  // componentWillUnmount() {
  //   this.unsubscribe()
  // }
  render() {
    return (<div>
      <p>{this.props.number}</p>
      <button onClick={this.props.increment1}>+</button>
      <button onClick={this.props.decrement1}>-</button>
      {/* <button onClick={this.props.asyncIncrement1}>++</button> */}
      <button onClick={this.props.asyncIncrement1}>trunk+</button>
    </div >)
  }
}

const mapStateToProps = (state: CombinedState): Count1State => state.counter1
const mapDispatchToProps = (dispatch: any) => (
  {
    increment1: () => dispatch({ type: TYPES.INCREMENT1 }),
    decrement1: () => dispatch({ type: TYPES.DECREMENT1 }),
    asyncIncrement1: () => dispatch((dispatch: Dispatch) => {
      setTimeout(function () {
        dispatch({ type: TYPES.INCREMENT1 });
      }, 3000)
    })
  }
)
export default connect<AnyAction>(mapStateToProps, mapDispatchToProps)(Counter1)