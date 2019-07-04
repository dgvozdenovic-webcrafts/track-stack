
export enum DialogModalActions {
    CLOSE_DIALOG = 'CLOSE_DIALOG',
    OPEN_DIALOG = 'OPEN_DIALOG',
}

export interface IDialogData {
    actions: IDialogButton[],
    closeDialog?: () => void,
    title: string,
    renderDescription: () => React.ReactNode,
}

export interface IDialogButton {
    label: string,
    callback: () => void,
    autofocus?: boolean,
}

export interface IDialogState {
    dialogData?: IDialogData,
    isDialogOpen: boolean,
}

const INITIAL_STATE: IDialogState = {
    dialogData: undefined,
    isDialogOpen: false,
}

const openDialog = (state, action) => ({
    ...state,
    dialogData: action.dialogData,
    isDialogOpen: true,
})

const closeDialog = (state) => ({
    ...state,
    ...INITIAL_STATE,
})

function dialogReducer(state: IDialogState = INITIAL_STATE, action) {
    switch (action.type) {
        case DialogModalActions.OPEN_DIALOG: {
            return openDialog(state, action)
        }
        case DialogModalActions.CLOSE_DIALOG: {
            return closeDialog(state)
        }
        default: return state
    }
}

export default dialogReducer
