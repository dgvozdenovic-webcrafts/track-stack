import React from 'react';
import { connect } from 'react-redux';
var mapStateToProps = function (state) { return state; };
var format = function (t) { return pad(t.getUTCHours()) + ":" + pad(t.getUTCMinutes()) + ":" + pad(t.getUTCSeconds()); };
var pad = function (n) { return n < 10 ? "0" + n : n; };
var Clock = function (_a) {
    var lastUpdate = _a.lastUpdate, light = _a.light;
    return (React.createElement("div", { className: light ? 'light' : '' }, format(new Date(lastUpdate))));
};
export default connect(mapStateToProps)(Clock);
//# sourceMappingURL=clock.js.map