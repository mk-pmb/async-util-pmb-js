/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var au = {}, arSlc = Array.prototype.slice;


au.wfTap = function (f) {
  // Interrupt the waterfall for async f, then continue with original args.
  return function () {
    var args = arSlc.call(arguments), aThen = args.pop();
    function fThen(err) { return aThen.apply(null, [err].concat(args)); }
    return f.apply(null, args.concat(fThen));
  };
};


au.wfMod = function (f) {
  // Get a chance to modify the args sync:
  return function () {
    var args = arSlc.call(arguments), aThen = args.pop();
    args = (f.apply(args, args) || args);
    aThen.apply(null, args);
  };
};


au.wfDropArgs = function () { return arguments[arguments.length - 1](); };





















module.exports = au;
