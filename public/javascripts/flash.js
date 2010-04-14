CS.Flash = function(selector) {
  this.$flash = $(selector);
};

CS.Flash.prototype.update = function(message, isError) {
  // update message
  this.$flash.text(message);
  
  // set error class
  if (isError) {
    this.$flash.addClass('error');
  } else {
    this.$flash.removeClass('error');
  }
  
  // position and show
  this.$flash.css({
    top: $(window).scrollTop() + 15,
    left: ($(window).width() - this.$flash.width()) / 2
  }).show();
  
  // fade out after delay
  this.$flash.delay(1500).fadeOut(1500);
};
