import React from 'react'
import ReactReduxContext from './context'
import { ContextValue } from './types'
import { Unsubscribe, bindActionCreators, ActionCreatorsMapObject, AnyAction, Action } from '../redux'
import { MapStateToProps } from './'
import { CombinedState } from '../store/reducers'


export default function <A = AnyAction>(
  mapStateToProps: MapStateToProps<CombinedState>,
  mapDispatchToProps: ActionCreatorsMapObject<A> | Function) {
  return function (OladComponent: React.ComponentType<any>) {
    return class extends React.Component {
      static contextType = ReactReduxContext
      unsubscribe: Unsubscribe
      constructor(props: any, context: ContextValue) {
        super(props)
        this.state = mapStateToProps(context.store.getState())
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()))
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        let actions = {}
        if (typeof mapDispatchToProps == 'function') {
          actions = mapDispatchToProps(this.context.store.dispatch)
        } else if (typeof mapDispatchToProps == 'object') {
          actions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
        }
        return <OladComponent {...this.state} {...actions} />
      }
    }
  }
}