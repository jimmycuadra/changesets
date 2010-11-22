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
  var jqRow = $(el).closest('tr'),
    sRevision = jqRow.find('td.revision span').text(),
    sTicket = jqRow.find('td.ticket span').text(),
    sDescription = jqRow.find('td.description').text(),
    sNotes = jqRow.find('td.notes').text();

  // capture the edit frame fields the first time through
  if (!(this.jqInpRevision || this.jqInpTicket || this.jqInpDescription || this.jqInpNotes)) {
    this.jqInpRevision = $('#inp-revision');
    this.jqInpTicket = $('#inp-ticket');
    this.jqInpDescription = $('#inp-description');
    this.jqInpNotes = $('#inp-notes');
  }

  this.jqInpRevision.val(sRevision);
  this.jqInpTicket.val(sTicket);
  this.jqInpDescription.val(sDescription);
  this.jqInpNotes.val(sNotes);

  this.jqEditFrameRevision.text(sRevision);
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
