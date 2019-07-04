import { SnackbarOrigin, SnackbarProps } from '@material-ui/core/Snackbar'

export enum SnackbarActions {
    CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
    OPEN_SNACKBAR = 'OPEN_SNACKBAR',
}

export interface ISnackbarState {
    vertical?: SnackbarOrigin['vertical'],
    horizontal?: SnackbarOrigin['horizontal'],
    message: string,
    onClose?: () => void,
    autohide?: SnackbarProps['autoHideDuration'],
    variant: 'success' | 'warning' | 'error' | 'info',
    open: boolean,
}

const INITIAL_STATE: ISnackbarState = {
    horizontal: 'right',
    message: '',
    open: false,
    variant: 'info',
    vertical: 'top',
}

const openSnackbar = (state, action) => ({
    ...state,
    ...action.config,
    open: true,
})

const closeSnackbar = (state) => ({
    ...state,
    ...INITIAL_STATE,
    open: false,
})

function snackbarReducer(state: ISnackbarState = INITIAL_STATE, action) {
    switch (action.type) {
        case SnackbarActions.OPEN_SNACKBAR: {
            return openSnackbar(state, action)
        }
        case SnackbarActions.CLOSE_SNACKBAR: {
            return closeSnackbar(state)
        }
        default: return state
    }
}

export default snackbarReducer
