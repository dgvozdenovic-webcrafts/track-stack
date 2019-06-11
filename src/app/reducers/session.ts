export enum SessionActions {
    AUTH_USER_SET = 'AUTH_USER_SET',
}
const INITIAL_STATE = {
    authUser: null,
}

const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser,
})

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SessionActions.AUTH_USER_SET: {
            return applySetAuthUser(state, action)
        }
        default: return state
    }
}

export default sessionReducer
