import React from 'react'
// import { Unsubscribe, bindActionCreators, Action } from '../redux'
// import store from '../store'
import actions from '../store/actions/counter2'
import { connect } from '../react-redux'
import { CombinedState } from '../store/reducers/'
import { Count2State } from '../store/reducers/counter2'

// interface Props { }
// interface State {
//   number: number
// }

// let boundActions = bindActionCreators(actions, store.dispatch)
// increment = bindActionCreators<Action, Dispatch<Action>>(increment, store.dispatch)
// decrement = bindActionCreators<Action, Dispatch<Action>>(decrement, store.dispatch)
type Props = ReturnType<typeof mapStateToProps> & typeof actions

export class Counter2 extends React.Component<Props> {
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
      <button onClick={this.props.increment2}>+</button>
      <button onClick={this.props.decrement2}>-</button>
    </div >)
  }
}

const mapStateToProps = (state: CombinedState): Count2State => state.counter2
export default connect(mapStateToProps, actions)(Counter2)