CHANGESETS.Interface = function () { };

CHANGESETS.Interface.prototype.init = function () {
  this.jqEditFrame = $('#current-wrapper');
  this.jqEditFrameForm = this.jqEditFrame.find('form');
  this.jqEditFrameHeader = this.jqEditFrame.find('header');
  this.jqEditFrameRevision = $('#edit-revision-text');
  this.jqBtnNew = $('#btn-new');
  this.jqBtnSave = $('#btn-save');
  this.jqBtnCancel = $('#btn-cancel');

  // attach button handlers
  this.jqBtnNew.click(this.listenClickNew.bind(this), false);
  this.jqBtnSave.click(this.listenClickSave.bind(this), false);
  this.jqBtnCancel.click(this.listenClickCancel.bind(this), false);
  $('button.btn-edit').live('click', this.listenClickEdit.bind(this), false);
};


// button handlers

CHANGESETS.Interface.prototype.listenClickNew = function () {
  this.jqEditFrameHeader.removeClass('edit').addClass('new');
  this.showEditFrame();
};

CHANGESETS.Interface.prototype.listenClickSave = function () {
  this.hideEditFrame();
};

CHANGESETS.Interface.prototype.listenClickCancel = function () {
  this.hideEditFrame();
};

CHANGESETS.Interface.prototype.listenClickEdit = function (evt, el) {
  this.jqEditFrameRevision.text($(el).closest('tr').attr('data-revision'));
  this.jqEditFrameHeader.removeClass('new').addClass('edit');
  this.showEditFrame();
};


// utility functions

CHANGESETS.Interface.prototype.showEditFrame = function () {
  this.jqEditFrame.removeClass('hidden');
  this.jqBtnNew.add('button.btn-edit').attr('disabled', 'disabled');
};

CHANGESETS.Interface.prototype.hideEditFrame = function () {
  this.jqEditFrame.addClass('hidden');
  this.jqEditFrameForm.get(0).reset();
  this.jqBtnNew.add('button.btn-edit').attr('disabled', '');
};
