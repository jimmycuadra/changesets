var CHANGESETS = {};

Function.prototype.bind = function() {
  var __method = this, args = Array.prototype.slice.call(arguments), object = args.shift();
  return function() {
    var local_args = args.concat(Array.prototype.slice.call(arguments));
    if (this !== window) local_args.push(this);
    return __method.apply(object, local_args);
  };
};
