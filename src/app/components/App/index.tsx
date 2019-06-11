import React from 'react'
import { compose } from 'recompose'

import withAuthentication from '../../session/withAuthentication'
import withAuthorization from '../../session/withAuthorization'
import Navigation from '../Navigation'

const App = ({ children }) => (
    <div className='app'>
        <Navigation />
        <hr />
        {children}
        <hr />
    </div>
)
const AppWithAuthentication = compose(
    withAuthentication,
    withAuthorization(false),
)(App)
const AppWithAuthorization = compose(
    withAuthentication,
    withAuthorization(true),
)(App)
export { AppWithAuthentication, AppWithAuthorization }
