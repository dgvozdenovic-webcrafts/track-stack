
import React from 'react'
import { connect } from 'react-redux'

import { DialogModalActions, IDialogData } from '../reducers/dialog'

export interface IWithDialogProps {
    closeDialog: () => void,
    openDialog: (dialogData: IDialogData) => void,

}

const withDialog = () => (Component) => {
    class WithDialog extends React.Component<IWithDialogProps> {
        public render() {

            const { openDialog, closeDialog } = this.props
            const newProps = {
                closeDialog,
                openDialog,
            }

            return (
                <React.Fragment>
                    <Component {...newProps}{...this.props} />
                </React.Fragment>
            )
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        closeDialog: () => dispatch({ type: DialogModalActions.CLOSE_DIALOG }),
        openDialog: (dialogData: IDialogData) => dispatch({ type: DialogModalActions.OPEN_DIALOG, dialogData }),
    })

    return connect(null, mapDispatchToProps)(WithDialog)
}

export default withDialog
