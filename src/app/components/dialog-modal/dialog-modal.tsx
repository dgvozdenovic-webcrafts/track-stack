import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import * as React from 'react'
import { connect } from 'react-redux'

import {
    DialogModalActions,
    IDialogButton,
    IDialogData,
    IDialogState,
} from '../../reducers/dialog'

interface IDialogProps {
    isDialogOpen: boolean,
    dialogData?: IDialogData,
    closeDialog: () => void,
}

function Transition(props: any) {
    return <Slide direction='up' {...props} />
}

class DialogModal extends React.Component<IDialogProps, {}> {

    constructor(props) {
        super(props)
    }

    public render() {
        const { dialogData, isDialogOpen, closeDialog } = this.props
        return (
            <Dialog
                TransitionComponent={Transition}
                open={isDialogOpen}
                onClose={closeDialog}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {dialogData && dialogData.title}
                </DialogTitle>
                <DialogContent>
                    <br />
                    {dialogData && dialogData.renderDescription()}
                </DialogContent>
                <DialogActions>
                    {this.renderDialogButton('Cancel', undefined, false)}
                    {
                        dialogData && dialogData.actions.map((btn: IDialogButton) =>
                            this.renderDialogButton(btn.label, btn.callback, btn.autofocus, btn.label))
                    }
                </DialogActions>
            </Dialog>
        )
    }

    private renderDialogButton(text: string, handler?: () => void, autoFocusEnabled?: boolean, key = 'default') {
        return (
            <Button
                key={key}
                color='primary'
                autoFocus={autoFocusEnabled}
                onClick={this.onButtonClick(handler)}
            >
                {text}
            </Button>
        )
    }

    private onButtonClick = (handler?: () => void) => () => {
        if (handler) {
            handler()
        }
        this.props.closeDialog()
    }
}
const mapDispatchToProps = (dispatch) => ({
    closeDialog: () => dispatch({ type: DialogModalActions.CLOSE_DIALOG }),
})

const mapStateToProps = (state): IDialogState => {
    return { ...state.dialogState }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogModal)
