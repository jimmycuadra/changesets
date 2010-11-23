CHANGESETS.Interface = function () { };

CHANGESETS.Interface.prototype.init = function () {
  // edit frame
  this.jqEditFrame = $('#current-wrapper');
  this.jqEditFrameForm = this.jqEditFrame.find('form');
  this.jqEditFrameHeader = this.jqEditFrame.find('header');
  this.jqEditFrameRevision = $('#edit-revision-text');

  // buttons
  this.jqBtnNew = $('#btn-new');
  this.jqBtnSave = $('#btn-save');
  this.jqBtnCancel = $('#btn-cancel');

  // inputs
  this.jqInpRevision = $('#inp-revision');
  this.jqInpTicket = $('#inp-ticket');
  this.jqInpDescription = $('#inp-description');
  this.jqInpNotes = $('#inp-notes');

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
  if (this.sCurrentRecordId) {
    this.updateRecord(this.updateRecordInTable.bind(this), this.displayErrors.bind(this));
  } else {
    this.createRecord(this.insertRecordInTable.bind(this), this.displayErrors.bind(this));
  }
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

  this.sCurrentRecordId = jqRow.attr('data-id');

  this.jqInpRevision.val(sRevision);
  this.jqInpTicket.val(sTicket);
  this.jqInpDescription.val(sDescription);
  this.jqInpNotes.val(sNotes);

  this.jqEditFrameRevision.text(sRevision);
  this.jqEditFrameHeader.removeClass('new').addClass('edit');
  this.showEditFrame();
};


// ajax functions

CHANGESETS.Interface.prototype.createRecord = function (fnSuccess, fnFailure) {
  $.post('/changesets', {
   'changeset[revision]': this.jqInpRevision.val(),
   'changeset[ticket]': this.jqInpTicket.val(),
   'changeset[description]': this.jqInpDescription.val(),
   'changeset[notes]': this.jqInpNotes.val(),
  }, function (oResponse) {
    if (oResponse.success) {
      fnSuccess(oResponse);
    } else {
      fnFailure(oResponse);
    }
  }, 'json');
};

CHANGESETS.Interface.prototype.updateRecord = function (fnSuccess, fnFailure) {
  console.log('updating record ' + this.sCurrentRecordId);
  // stub
};


// save callbacks

CHANGESETS.Interface.prototype.insertRecordInTable = function (oResponse) {
  console.log('success', oResponse);
  // stub
};

CHANGESETS.Interface.prototype.updateRecordInTable = function (oResponse) {
  // stub
};

CHANGESETS.Interface.prototype.displayErrors = function (oResponse) {
  console.log('failure', oResponse);
  // stub
};


// utility functions

CHANGESETS.Interface.prototype.showEditFrame = function () {
  this.jqEditFrame.removeClass('hidden');
  this.jqBtnNew.add('button.btn-edit').attr('disabled', 'disabled');
};

CHANGESETS.Interface.prototype.hideEditFrame = function () {
  delete this.sCurrentRecordId;
  this.jqEditFrame.addClass('hidden');
  this.jqEditFrameForm.get(0).reset();
  this.jqBtnNew.add('button.btn-edit').attr('disabled', '');
};
