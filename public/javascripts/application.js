$(function() {
  CS.ajaxSetup();
  
  var flash = new CS.Flash('#flash'),
    cs = new CS.Changesets({
      flash: flash
    });
});
