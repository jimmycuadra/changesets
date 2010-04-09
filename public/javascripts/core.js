if (typeof CS == 'undefined') {
  CS = {};
}

if (typeof Function.prototype.bind == 'undefined') {
  Function.prototype.bind = function() {
    var __method = this, args = Array.prototype.slice.call(arguments), object = args.shift();
    return function() {
      var local_args = args.concat(Array.prototype.slice.call(arguments));
      if (this !== window) local_args.push(this);
      return __method.apply(object, local_args);
    };
  };
}

CS.ajaxSetup = function () {
  $(document).ajaxSend(function(event, request, settings) {
    if (typeof(AUTH_TOKEN) == "undefined") return;
    // settings.data is a serialized string like "foo=bar&baz=boink" (or null)
    settings.data = settings.data || "";
    settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN);
  });
}
