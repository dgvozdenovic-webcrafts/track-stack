import {
  AppComponentProps,
  Container,
} from 'next/app'
import React from 'react'
import {
  Provider,
} from 'react-redux'
import withReduxStore, { Store } from '../lib/with-redux-store'

interface IMyAppProps {
  reduxStore: Store,
  pageProps: any
}

export default withReduxStore(
  class MyApp extends React.Component<IMyAppProps & AppComponentProps> {
    public render() {
      const { Component, pageProps, reduxStore } = this.props
      return (
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  },
)
