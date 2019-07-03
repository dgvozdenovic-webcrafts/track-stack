import React from 'react'
import { compose } from 'recompose'

import withAuthentication from '../../hoc/withAuthentication'
import withAuthorization from '../../hoc/withAuthorization'
import Navigation from '../Navigation'
import SnackbarModal from '../snackbar-modal/snackbar-modal'

const App = ({ children }) => (
    <div className='app'>
        <Navigation />
        <SnackbarModal />
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
