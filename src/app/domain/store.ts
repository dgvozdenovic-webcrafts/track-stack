import {
  applyMiddleware,
  createStore,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export const exampleInitialState: IState = {
  count: 0,
  lastUpdate: 0,
  light: false,
}

export interface IState {
  lastUpdate: number,
  light: boolean,
  count: number,
}

export const actionTypes = {
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
  RESET: 'RESET',
  TICK: 'TICK',
}

// REDUCERS
export const reducer = (state: IState = exampleInitialState, action): IState => {
  switch (action.type) {
    case actionTypes.TICK:
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light,
      }
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      }
    case actionTypes.RESET:
      return {
        ...state,
        count: exampleInitialState.count,
      }
    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer) => (dispatch) => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = (dispatch) => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => (dispatch) => {
  return dispatch({ type: actionTypes.INCREMENT })
}

export const decrementCount = () => (dispatch) => {
  return dispatch({ type: actionTypes.DECREMENT })
}

export const resetCount = () => (dispatch) => {
  return dispatch({ type: actionTypes.RESET })
}

export function initializeStore(initialState: IState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
