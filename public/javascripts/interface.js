CHANGESETS.Interface = function () { };

CHANGESETS.Interface.prototype.init = function () {
  // changesets table
  this.jqChangesets = $('#changesets');

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
  var fnSuccess = this.sCurrentRecordId ? this.updateRecord.bind(this) : this.insertRecord.bind(this);

  this.postRecord(fnSuccess, this.displayErrors.bind(this));
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

CHANGESETS.Interface.prototype.postRecord = function (fnSuccess, fnFailure) {
  var sURL = '/changesets',
    oData = {
      'changeset[revision]': this.jqInpRevision.val(),
      'changeset[ticket]': this.jqInpTicket.val(),
      'changeset[description]': this.jqInpDescription.val(),
      'changeset[notes]': this.jqInpNotes.val(),
    };

  if (this.sCurrentRecordId) {
    sURL += '/' + this.sCurrentRecordId;
    oData['_method'] = 'put';
  }

  $.post(sURL, oData, function (oResponse) {
    if (oResponse.success) {
      fnSuccess(oResponse);
    } else {
      fnFailure(oResponse);
    }
  }, 'json');
};


// save callbacks

CHANGESETS.Interface.prototype.insertRecord = function (oResponse) {
  this.jqChangesets.prepend(oResponse.changeset);
  this.hideEditFrame();
};

CHANGESETS.Interface.prototype.updateRecord = function (oResponse) {
  this.jqChangesets.find('tr[data-id=' + this.sCurrentRecordId + ']').replaceWith(oResponse.changeset);
  this.hideEditFrame();
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
