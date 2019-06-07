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
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Index.getInitialProps = function (_a) {
        var reduxStore = _a.reduxStore, req = _a.req;
        var isServer = !!req;
        reduxStore.dispatch(serverRenderClock(isServer));
        return {};
    };
    Index.prototype.componentDidMount = function () {
        var dispatch = this.props.dispatch;
        this.timer = startClock(dispatch);
    };
    Index.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    Index.prototype.render = function () {
        return (React.createElement(Clock, null));
    };
    return Index;
}(React.Component));
export default connect(null, mapDispatchToProps)(Index);
//# sourceMappingURL=index.js.map