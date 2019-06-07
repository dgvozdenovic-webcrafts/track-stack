var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { applyMiddleware, createStore, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
export var exampleInitialState = {
    count: 0,
    lastUpdate: 0,
    light: false,
};
export var actionTypes = {
    DECREMENT: 'DECREMENT',
    INCREMENT: 'INCREMENT',
    RESET: 'RESET',
    TICK: 'TICK',
};
// REDUCERS
export var reducer = function (state, action) {
    if (state === void 0) { state = exampleInitialState; }
    switch (action.type) {
        case actionTypes.TICK:
            return __assign({}, state, { lastUpdate: action.ts, light: !!action.light });
        case actionTypes.INCREMENT:
            return __assign({}, state, { count: state.count + 1 });
        case actionTypes.DECREMENT:
            return __assign({}, state, { count: state.count - 1 });
        case actionTypes.RESET:
            return __assign({}, state, { count: exampleInitialState.count });
        default: return state;
    }
};
// ACTIONS
export var serverRenderClock = function (isServer) { return function (dispatch) {
    return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
}; };
export var startClock = function (dispatch) {
    return setInterval(function () {
        // Dispatch `TICK` every 1 second
        dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() });
    }, 1000);
};
export var incrementCount = function () { return function (dispatch) {
    return dispatch({ type: actionTypes.INCREMENT });
}; };
export var decrementCount = function () { return function (dispatch) {
    return dispatch({ type: actionTypes.DECREMENT });
}; };
export var resetCount = function () { return function (dispatch) {
    return dispatch({ type: actionTypes.RESET });
}; };
export function initializeStore(initialState) {
    if (initialState === void 0) { initialState = exampleInitialState; }
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
//# sourceMappingURL=store.js.map