import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AppWithAuthorization } from '../components/App'
import { db } from '../firebase'
import { UserActions } from '../reducers/user'

interface IHomePageProps {
    users: any,
    onSetUsers: (IFromObjectToList) => void
}

interface IHomePageState {
    userState: any,
}

type IFromObjectToList = typeof fromObjectToList

const fromObjectToList = (object) =>
    object
        ? Object.keys(object).map((key) => ({ ...object[key], index: key }))
        : []

class HomePage extends Component<IHomePageProps, IHomePageState> {
    public componentDidMount() {
        const { onSetUsers } = this.props

        db.streamGetUsers((snapshot) =>
            onSetUsers(fromObjectToList(snapshot.val())))
    }

    public render() {
        const { users } = this.props

        return (
            <AppWithAuthorization>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>

                <Container maxWidth='xl'>
                    <Box my={4}>
                        <Typography color='secondary' variant='h4' component='h1' gutterBottom={true}>
                            Home
                        </Typography>
                        {!!users.length && <UserList users={users} />}
                    </Box>
                </Container>
            </AppWithAuthorization>
        )
    }
}

const UserList = ({ users }) => (
    <div>
        <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
        {users.map((user) => (<div key={user.index}>{user.index}</div>))}
    </div>
)

const mapStateToProps = (state) => ({
    users: state.userState.users,
})

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: UserActions.USER_SET, users }),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage)
