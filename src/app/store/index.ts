import {
    compose,
    createStore,
} from 'redux'
import rootReducer from '../reducers'
import DevTools from '../utilities/react-dev-tools'

const enhancer = compose(
    // applyMiddleware(), // TODO: Apply async middleware like thunk
    DevTools.instrument(),
)

const initStore = (initialState) => createStore(rootReducer, initialState, enhancer)

export default initStore
