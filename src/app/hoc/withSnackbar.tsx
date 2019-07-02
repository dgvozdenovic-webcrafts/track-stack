import { IconButton, SnackbarContent, withStyles } from '@material-ui/core'
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import React from 'react'

import theme, { success, warning } from '../styles/theme'

export interface IWithSnackbarState {
    vertical?: any,
    horizontal?: any,
    message: string,
    onClose?: () => void,
    autohide?: number,
    variant: 'success' | 'warning' | 'error' | 'info',
    open: boolean,
}

export interface IWithSnackbarProps {
    hideSnackbar: () => void,
    showSnackbar: (SnackbarProps: SnackbarProps) => void,
}

const INITIAL_PROPS: IWithSnackbarState = {
    horizontal: 'left',
    message: 'Informaciones',
    onClose: () => false,
    open: true,
    variant: 'info',
    vertical: 'bottom',
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
                ...INITIAL_PROPS,
            }

            this.showSnackbar = this.showSnackbar.bind(this)
            this.hideSnackbar = this.hideSnackbar.bind(this)
        }

        public showSnackbar(snackBarConfig: Omit<IWithSnackbarState, 'open'>) {
            this.setState({
                ...snackBarConfig,
                open: true,
            })
        }

        public hideSnackbar() {
            this.setState({
                ...INITIAL_PROPS,
            })
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

            const { vertical, horizontal, open, message, variant, onClose } = this.state

            const snackbarProps = {
                anchorOrigin: {
                    horizontal,
                    vertical,
                },
                open,
            }

            return (
                <React.Fragment>
                    <Component {...newProps}{...this.props} />
                    <Snackbar  {...snackbarProps}>
                        {this.renderSnackbar(variant, message, onClose)}
                    </Snackbar>

                </React.Fragment>
            )
        }
    }

    return WithSnackbar
}

export default withSnackbar
