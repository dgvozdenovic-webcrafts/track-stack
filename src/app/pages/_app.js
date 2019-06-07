var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Container, } from 'next/app';
import React from 'react';
import { Provider, } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';
export default withReduxStore(/** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyApp.prototype.render = function () {
        var _a = this.props, Component = _a.Component, pageProps = _a.pageProps, reduxStore = _a.reduxStore;
        return (React.createElement(Container, null,
            React.createElement(Provider, { store: reduxStore },
                React.createElement(Component, __assign({}, pageProps)))));
    };
    return MyApp;
}(React.Component)));
//# sourceMappingURL=_app.js.map