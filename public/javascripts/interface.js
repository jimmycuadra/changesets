CHANGESETS.Interface = function () { };

CHANGESETS.Interface.prototype.init = function () {
  this.jqEditFrame = $('#current-wrapper');
  this.jqBtnNew = $('#btn-new');
  this.jqBtnSave = $('#btn-save');
  this.jqBtnCancel = $('#btn-cancel');

  // button handlers
  this.jqBtnNew.click(this.listenClickNew.bind(this), false);
  this.jqBtnSave.click(this.listenClickSave.bind(this), false);
  this.jqBtnCancel.click(this.listenClickSave.bind(this), false);
};


// button handlers

CHANGESETS.Interface.prototype.listenClickNew = function () {
  this.jqEditFrame.removeClass('hidden');
  this.jqBtnNew.attr('disabled', 'disabled');
};

CHANGESETS.Interface.prototype.listenClickSave = function () {
  this.jqEditFrame.addClass('hidden');
  this.jqBtnNew.attr('disabled', '');
};

CHANGESETS.Interface.prototype.listenClickCancel = function () {
  this.jqEditFrame.addClass('hidden');
  this.jqBtnNew.attr('disabled', '');
};
