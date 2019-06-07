module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Juyh");


/***/ }),

/***/ "45mK":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("gHn/");

/***/ }),

/***/ "4SvY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);



var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var format = function format(t) {
  return pad(t.getUTCHours()) + ":" + pad(t.getUTCMinutes()) + ":" + pad(t.getUTCSeconds());
};

var pad = function pad(n) {
  return n < 10 ? "0" + n : n;
};

var Clock = function Clock(_a) {
  var lastUpdate = _a.lastUpdate,
      light = _a.light;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: light ? 'light' : ''
  }, format(new Date(lastUpdate)));
};

/* harmony default export */ __webpack_exports__["a"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(Clock));

/***/ }),

/***/ "Gozm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("vqFK");

/***/ }),

/***/ "Juyh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Tqks");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("U9rZ");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_clock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4SvY");
/* harmony import */ var _domain_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("QISE");
/* harmony import */ var _lib_with_redux_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("KrKE");



var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(b) : (__.prototype = b.prototype, new __());
  };
}();





 // interface IProps { }

var About =
/** @class */
function (_super) {
  __extends(About, _super);

  function About() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  About.getInitialProps = function (_a) {
    var reduxStore = _a.reduxStore,
        req = _a.req;
    var isServer = !!req;
    reduxStore.dispatch(Object(_domain_store__WEBPACK_IMPORTED_MODULE_5__[/* serverRenderClock */ "c"])(isServer));
    return {};
  };

  About.prototype.componentDidMount = function () {
    var dispatch = this.props.dispatch;
    this.timer = Object(_domain_store__WEBPACK_IMPORTED_MODULE_5__[/* startClock */ "d"])(dispatch);
  };

  About.prototype.componentWillUnmount = function () {
    clearInterval(this.timer);
  };

  About.prototype.render = function () {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_clock__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null);
  };

  return About;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(null, _lib_with_redux_store__WEBPACK_IMPORTED_MODULE_6__[/* mapDispatchToProps */ "b"])(About));

/***/ }),

/***/ "KrKE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapDispatchToProps; });
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("45mK");
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Gozm");
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Ml6p");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("OCF2");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Tqks");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("U9rZ");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _domain_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("QISE");







var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = _babel_runtime_corejs2_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default.a || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default()(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = undefined && undefined.__assign || function () {
  __assign = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default.a || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof _babel_runtime_corejs2_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[_babel_runtime_corejs2_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};



var isServer = typeof window === 'undefined';
var __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return Object(_domain_store__WEBPACK_IMPORTED_MODULE_7__[/* initializeStore */ "b"])(initialState);
  } // Store in global variable if client


  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = Object(_domain_store__WEBPACK_IMPORTED_MODULE_7__[/* initializeStore */ "b"])(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

var withReduxStore = function withReduxStore(Component) {
  return (
    /** @class */
    function (_super) {
      __extends(Redux, _super);

      function Redux(props) {
        var _this = _super.call(this, props) || this;

        _this.reduxStore = getOrCreateStore(props.initialReduxState);
        return _this;
      }

      Redux.getInitialProps = function (appContext) {
        return __awaiter(this, void 0, void 0, function () {
          var reduxStore, appProps;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                reduxStore = getOrCreateStore(_domain_store__WEBPACK_IMPORTED_MODULE_7__[/* exampleInitialState */ "a"]); // Provide the store to getInitialProps of pages

                appContext.ctx.reduxStore = reduxStore;
                appProps = {};
                if (!Component.getInitialProps) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , Component.getInitialProps(appContext)];

              case 1:
                appProps = _a.sent();
                _a.label = 2;

              case 2:
                return [2
                /*return*/
                , __assign({}, appProps, {
                  initialReduxState: reduxStore.getState()
                })];
            }
          });
        });
      };

      Redux.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, __assign({}, this.props, {
          reduxStore: this.reduxStore
        }));
      };

      return Redux;
    }(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (withReduxStore);
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

/***/ }),

/***/ "Ml6p":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "OCF2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dGr4");

/***/ }),

/***/ "QISE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exampleInitialState; });
/* unused harmony export actionTypes */
/* unused harmony export reducer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return serverRenderClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return startClock; });
/* unused harmony export incrementCount */
/* unused harmony export decrementCount */
/* unused harmony export resetCount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initializeStore; });
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hc8B");
/* harmony import */ var _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("OCF2");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rKB8");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ufKq");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ZSx1");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_4__);



var __assign = undefined && undefined.__assign || function () {
  __assign = _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default.a || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};




var exampleInitialState = {
  count: 0,
  lastUpdate: 0,
  light: false
};
var actionTypes = {
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
  RESET: 'RESET',
  TICK: 'TICK'
}; // REDUCERS

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = exampleInitialState;
  }

  switch (action.type) {
    case actionTypes.TICK:
      return __assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      });

    case actionTypes.INCREMENT:
      return __assign({}, state, {
        count: state.count + 1
      });

    case actionTypes.DECREMENT:
      return __assign({}, state, {
        count: state.count - 1
      });

    case actionTypes.RESET:
      return __assign({}, state, {
        count: exampleInitialState.count
      });

    default:
      return state;
  }
}; // ACTIONS

var serverRenderClock = function serverRenderClock(isServer) {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.TICK,
      light: !isServer,
      ts: _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0___default()()
    });
  };
};
var startClock = function startClock(dispatch) {
  return setInterval(function () {
    // Dispatch `TICK` every 1 second
    dispatch({
      type: actionTypes.TICK,
      light: true,
      ts: _babel_runtime_corejs2_core_js_date_now__WEBPACK_IMPORTED_MODULE_0___default()()
    });
  }, 1000);
};
var incrementCount = function incrementCount() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.INCREMENT
    });
  };
};
var decrementCount = function decrementCount() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.DECREMENT
    });
  };
};
var resetCount = function resetCount() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.RESET
    });
  };
};
function initializeStore(initialState) {
  if (initialState === void 0) {
    initialState = exampleInitialState;
  }

  if (!initialState) {
    return;
  }

  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(reducer, {}, Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4___default.a)));
}

/***/ }),

/***/ "Tqks":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("o5io");

/***/ }),

/***/ "U9rZ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Wk4r");

/***/ }),

/***/ "Wk4r":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "dGr4":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "gHn/":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hc8B":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("y6vh");

/***/ }),

/***/ "o5io":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "vqFK":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),

/***/ "y6vh":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/date/now");

/***/ })

/******/ });