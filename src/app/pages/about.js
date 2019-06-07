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
import React from 'react';
import { connect } from 'react-redux';
import Clock from '../components/clock';
import { serverRenderClock, startClock, } from '../domain/store';
import { mapDispatchToProps, } from '../lib/with-redux-store';
// interface IProps { }
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    About.getInitialProps = function (_a) {
        var reduxStore = _a.reduxStore, req = _a.req;
        var isServer = !!req;
        reduxStore.dispatch(serverRenderClock(isServer));
        return {};
    };
    About.prototype.componentDidMount = function () {
        var dispatch = this.props.dispatch;
        this.timer = startClock(dispatch);
    };
    About.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    About.prototype.render = function () {
        return (React.createElement(Clock, null));
    };
    return About;
}(React.Component));
export default connect(null, mapDispatchToProps)(About);
//# sourceMappingURL=about.js.map