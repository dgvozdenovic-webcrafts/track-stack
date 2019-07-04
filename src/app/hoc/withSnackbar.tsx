
import React from 'react'
import { connect } from 'react-redux'

import { ISnackbarState, SnackbarActions } from '../reducers/snackbar'

export interface IWithSnackbarProps {
    closeSnackbar: () => void,
    openSnackbar: (SnackbarProps: Omit<ISnackbarState, 'open'>) => void,

}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

const withSnackbar = () => (Component) => {
    class WithSnackbar extends React.Component<IWithSnackbarProps> {
        public render() {

            const { closeSnackbar, openSnackbar } = this.props
            const newProps = {
                closeSnackbar,
                openSnackbar,
            }

            return (
                <React.Fragment>
                    <Component {...newProps}{...this.props} />
                </React.Fragment>
            )
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        closeSnackbar: () => dispatch({ type: SnackbarActions.CLOSE_SNACKBAR }),
        openSnackbar: (config) => dispatch({ type: SnackbarActions.OPEN_SNACKBAR, config }),
    })

    return connect(null, mapDispatchToProps)(WithSnackbar)
}

export default withSnackbar
