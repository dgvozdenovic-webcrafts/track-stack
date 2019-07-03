import { IconButton, SnackbarContent, withStyles } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import React from 'react'
import { connect } from 'react-redux'

import { ISnackbarState, SnackbarActions } from '../../reducers/snackbar'
import theme, { success, warning } from '../../styles/theme'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IWithSnackbarProps {
    closeSnackbar: () => void,
    openSnackbar: (SnackbarProps: Omit<ISnackbarState, 'open'>) => void,
    vertical?: ISnackbarState['vertical'],
    horizontal?: ISnackbarState['horizontal'],
    message: ISnackbarState['message'],
    onClose?: ISnackbarState['onClose'],
    autohide?: ISnackbarState['autohide'],
    variant: ISnackbarState['variant'],
    open: ISnackbarState['open'],
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

class SnackbarModal extends React.Component<IWithSnackbarProps, {}> {

    constructor(props) {
        super(props)
    }

    public onCloseSnackbar = () => {
        const { closeSnackbar, onClose } = this.props
        if (onClose) {
            onClose()
        }

        closeSnackbar()
    }

    public renderSnackbar() {
        const {
            message,
            variant = 'info',
        } = this.props
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
                    <IconButton key='close' aria-label='Close' color='inherit' onClick={this.onCloseSnackbar}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    }

    public render() {
        const {
            autohide,
            vertical = 'bottom',
            horizontal = 'left',
            open,
        } = this.props

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
                {open &&
                    <Snackbar
                        onClose={this.onCloseSnackbar}
                        {...snackbarProps}
                    >
                        {this.renderSnackbar()}
                    </Snackbar>
                }
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeSnackbar: () => dispatch({ type: SnackbarActions.CLOSE_SNACKBAR }),
    openSnackbar: (config) => dispatch({ type: SnackbarActions.OPEN_SNACKBAR, config }),
})

const mapStateToProps = (state): IWithSnackbarProps => {
    return { ...state.snackbarState }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarModal)
