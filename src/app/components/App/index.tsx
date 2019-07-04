import React from 'react'
import { compose } from 'recompose'

import withAuthentication from '../../hoc/withAuthentication'
import withAuthorization from '../../hoc/withAuthorization'
import DevTools from '../../utilities/react-dev-tools'
import DialogModal from '../dialog-modal/dialog-modal'
import Navigation from '../Navigation'
import SnackbarModal from '../snackbar-modal/snackbar-modal'

const App = ({ children }) => (
    <div className='app'>
        <Navigation />
        <SnackbarModal />
        <DialogModal />
        {renderDevTools()}
        <hr />
        {children}
        <hr />
    </div>
)

const renderDevTools = () => {
    // only render DevTools in development
    if (process.env.NODE_ENV === 'development') {
        return <DevTools />
    }
    return null
}
const AppWithAuthentication = compose(
    withAuthentication,
    withAuthorization(false),
)(App)
const AppWithAuthorization = compose(
    withAuthentication,
    withAuthorization(true),
)(App)
export { AppWithAuthentication, AppWithAuthorization }
