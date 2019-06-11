import React from 'react'
import { connect } from 'react-redux'

import { firebase } from '../firebase'
import { SessionActions } from '../reducers/session'

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component<any, any> {
        public componentDidMount() {
            const { onSetAuthUser } = this.props

            firebase.auth.onAuthStateChanged((authUser) => {
                authUser
                    ? onSetAuthUser(authUser)
                    : onSetAuthUser(null)
            })
        }

        public render() {
            return (
                <Component {...this.props} />
            )
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: (authUser) => dispatch({ type: SessionActions.AUTH_USER_SET, authUser }),
    })

    return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication
