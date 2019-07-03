import { IconButton, SnackbarContent, withStyles } from '@material-ui/core'
import Snackbar, { SnackbarOrigin, SnackbarProps } from '@material-ui/core/Snackbar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import React from 'react'

import theme, { success, warning } from '../styles/theme'

export interface IWithSnackbarState {
    vertical?: SnackbarOrigin['vertical'],
    horizontal?: SnackbarOrigin['horizontal'],
    message: string,
    onClose?: () => void,
    autohide?: SnackbarProps['autoHideDuration'],
    variant: 'success' | 'warning' | 'error' | 'info',
    open: boolean,
}

export interface IWithSnackbarProps {
    hideSnackbar: () => void,
    showSnackbar: (SnackbarProps: Omit<IWithSnackbarState, 'open'>) => void,
}

const variantIcon = {
    error: ErrorIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
}

const variantColor = {
    error: theme.palette.error.main,
    info: theme.palette.primary.light,
    success,
    warning,
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

const withSnackbar = () => (Component) => {
    class WithSnackbar extends React.Component<{}, IWithSnackbarState> {

        constructor(props) {
            super(props)

            this.state = {
                ...this.getInitalProps(),
            }

            this.showSnackbar = this.showSnackbar.bind(this)
            this.hideSnackbar = this.hideSnackbar.bind(this)
            this.getInitalProps = this.getInitalProps.bind(this)
        }

        public showSnackbar(snackBarConfig: Omit<IWithSnackbarState, 'open'>) {
            this.setState({
                ...snackBarConfig,
                open: true,
            })
        }

        public hideSnackbar() {
            this.setState({
                ...this.getInitalProps(),
            })
        }

        public getInitalProps(): IWithSnackbarState {
            return {
                horizontal: 'right',
                message: 'Informaciones',
                onClose: this.hideSnackbar.bind(this),
                open: false,
                variant: 'info',
                vertical: 'top',
            }
        }

        public renderSnackbar(variant, message, onClose) {
            const Icon = variantIcon[variant]

            const FormatedSnackbarContent = withStyles(() => ({
                message: {
                    '&>*': {
                        '&>svg': {
                            marginRight: 5,
                        },
                        'align-items': 'center',
                        'display': 'flex',
                    },
                },
                root: {
                    backgroundColor: variantColor[variant],
                },
            }))(SnackbarContent)

            return (
                <FormatedSnackbarContent
                    aria-describedby='client-snackbar'
                    message={
                        <span id='client-snackbar'>
                            <Icon />
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton key='close' aria-label='Close' color='inherit' onClick={onClose}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            )
        }

        public render() {
            const newProps = {
                hideSnackbar: this.hideSnackbar,
                showSnackbar: this.showSnackbar,
            }

            const {
                autohide,
                vertical = 'bottom',
                horizontal = 'left',
                open,
                message,
                variant = 'info',
                onClose,
            } = this.state

            const snackbarProps = {
                anchorOrigin: {
                    horizontal,
                    vertical,
                },
                autoHideDuration: autohide,
                open,
            }

            return (
                <React.Fragment>
                    <Component {...newProps}{...this.props} />
                    {open &&
                        <Snackbar
                            onClose={
                                onClose || this.hideSnackbar
                            }
                            {...snackbarProps}
                        >
                            {this.renderSnackbar(variant, message, onClose)}
                        </Snackbar>
                    }
                </React.Fragment>
            )
        }
    }

    return WithSnackbar
}

export default withSnackbar
