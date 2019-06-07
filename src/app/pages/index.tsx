import React from 'react'
import { connect } from 'react-redux'
import Clock from '../components/clock'
import {
  serverRenderClock,
  startClock,
} from '../domain/store'
import {
  Dispatchable,
  mapDispatchToProps,
} from '../lib/with-redux-store'

// interface IProps { }

class Index extends React.Component<Dispatchable<{}>> {

  public static getInitialProps({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }
  private timer: NodeJS.Timer

  public componentDidMount() {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }

  public componentWillUnmount() {
    clearInterval(this.timer)
  }

  public render() {
    return (
      <Clock />
    )
  }
}

export default connect(null, mapDispatchToProps)(Index)
