import { combineReducers } from 'redux'
import dialogReducer from './dialog'
import sessionReducer from './session'
import snackbarReducer from './snackbar'
import userReducer from './user'

const rootReducer = combineReducers({
    dialogState: dialogReducer,
    sessionState: sessionReducer,
    snackbarState: snackbarReducer,
    userState: userReducer,
})

export default rootReducer
