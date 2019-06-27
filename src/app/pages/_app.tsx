import { ThemeProvider } from '@material-ui/styles'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import React from 'react'
import { loadReCaptcha } from 'react-recaptcha-google'
import { Provider } from 'react-redux'

import ReduxDevTools from '../components/DevTools'
import initStore from '../store'
import theme from '../styles/theme'
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
  public componentDidMount() {
    loadReCaptcha()
  }

  public render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <ReduxDevTools />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(EnhancedApp)
