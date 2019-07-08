import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AppWithAuthorization } from '../components/App'
import { db, image } from '../firebase'
import { UserActions } from '../reducers/user'
import ImageUpload from '../components/upload-button/upload-button'

interface IHomePageProps {
    users: any,
    userId: string,
    onSetUsers: (IFromObjectToList) => void
}

interface IHomePageState {
    images: any[],
}

type IFromObjectToList = typeof fromObjectToList

const fromObjectToList = (object) =>
    object
        ? Object.keys(object).map((key) => ({ ...object[key], index: key }))
        : []

const previewStyle = {
    maxHeight: '100px',
    maxWidth: '100px',
}

class HomePage extends Component<IHomePageProps, IHomePageState> {

    constructor(props) {
        super(props)

        this.state = {
            images: [],
        }
    }

    public componentDidMount() {
        const { onSetUsers, userId } = this.props

        db.streamGetUsers((snapshot) =>
            onSetUsers(fromObjectToList(snapshot.val())))

        image.streamImages(userId, (snapshot) =>
            this.setState({
                images: [...fromObjectToList(snapshot.val())],
            }),
        )
    }

    public render() {
        const { userId, users } = this.props
        const { images } = this.state

        return (
            <AppWithAuthorization>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>

                <Container maxWidth='xl'>
                    <Box my={4}>
                        <Typography color='secondary' variant='h4' component='h1' gutterBottom={true}>
                            Home
                        </Typography>
                        <ImageUpload userId={userId} />
                        {!!users.length && <UserList users={users} />}
                    </Box>
                    <Box my={12}>
                        {images.map((img) => <img src={img.url} key={img.url} style={previewStyle} />)}
                    </Box>
                </Container>
            </AppWithAuthorization >
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
    userId: state.sessionState.userId,
    users: state.userState.users,
})

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: UserActions.USER_SET, users }),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage)
