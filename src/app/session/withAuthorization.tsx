import Router from 'next/router'
import React from 'react'

import * as routes from '../const/routes'
import { firebase } from '../firebase'

const withAuthorization = (needsAuthorization) => (Component) => {
    class WithAuthorization extends React.Component {
        public componentDidMount() {
            firebase.auth.onAuthStateChanged((authUser) => {
                if (!authUser && needsAuthorization) {
                    Router.push(routes.SIGN_IN)
                }
            })
        }

        public render() {
            return (
                <Component {...this.props} />
            )
        }
    }

    return WithAuthorization
}

export default withAuthorization
