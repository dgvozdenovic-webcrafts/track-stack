import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import ReduxDevTools from '../components/DevTools'
import initStore from '../store'
interface IEnhancedAppProps {
  store: any,
}
class EnhancedApp extends App<IEnhancedAppProps> {
  public static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    }
  }

  public render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <ReduxDevTools />
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(EnhancedApp)
