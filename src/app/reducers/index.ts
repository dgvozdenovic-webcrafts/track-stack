import { combineReducers } from 'redux'
import sessionReducer from './session'
import snackbarReducer from './snackbar'
import userReducer from './user'

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    snackbarState: snackbarReducer,
    userState: userReducer,
})

export default rootReducer
