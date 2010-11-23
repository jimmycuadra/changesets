CHANGESETS.Interface = function () { };

CHANGESETS.Interface.prototype.init = function () {
  // changesets table
  this.jqChangesets = $('#changesets');

  // edit frame
  this.jqEditFrame = $('#current-wrapper');
  this.jqEditFrameForm = this.jqEditFrame.find('form');
  this.jqEditFrameHeader = this.jqEditFrame.find('header');
  this.jqEditFrameRevision = $('#edit-revision-text');

  // errors
  this.jqErrorFrame = $('#errors');
  this.jqErrors = $('#error-list');

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
  $('button.btn-delete').live('click', this.listenClickDelete.bind(this), false);
  $('button.btn-merge').live('click', this.listenClickMerge.bind(this), false);
};


// button handlers

CHANGESETS.Interface.prototype.listenClickNew = function () {
  this.jqEditFrameHeader.removeClass('edit').addClass('new');
  this.showEditFrame();
};

CHANGESETS.Interface.prototype.listenClickSave = function () {
  var fnSuccess = this.sCurrentRecordId ? this.updateRecord.bind(this) : this.insertRecord.bind(this);

  this.hideErrors();
  this.postRecord(fnSuccess, this.showErrors.bind(this));
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

CHANGESETS.Interface.prototype.listenClickDelete = function (evt, el) {
  var jqRow = $(el).closest('tr'),
    nID = jqRow.data('id');

  if (confirm('Are you sure you want to delete revision ' + nID + '?')) {
    this.deleteRecord(nID, function () {
      jqRow.remove();
    });
  }
};

CHANGESETS.Interface.prototype.listenClickMerge = function (evt, el) {
  var jqEl = $(el),
    jqRow = jqEl.closest('tr'),
    nID = jqRow.data('id'),
    bNewValue = jqRow.hasClass('unmerged');

  this.toggleMerge(nID, bNewValue, function () {
    var sNewButtonText = (jqEl.text() == 'Merge') ? 'Unmerge' : 'Merge';

    jqRow.toggleClass('unmerged');
    jqEl.text(sNewButtonText);
  });
}


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
      fnSuccess(oResponse.changeset);
    } else {
      fnFailure(oResponse.errors);
    }
  }, 'json');
};

CHANGESETS.Interface.prototype.deleteRecord = function (nID, fnSuccess) {
  $.post('/changesets/' + nID, {
    '_method': 'delete'
  }, fnSuccess);
};

CHANGESETS.Interface.prototype.toggleMerge = function (nID, bNewValue, fnSuccess) {
  $.post('/changesets/' + nID, {
    '_method': 'put',
    'changeset[merged]': bNewValue
  }, fnSuccess);
};


// save callbacks

CHANGESETS.Interface.prototype.insertRecord = function (sChangeset) {
  this.jqChangesets.prepend(sChangeset);
  this.hideEditFrame();
};

CHANGESETS.Interface.prototype.updateRecord = function (sChangeset) {
  this.jqChangesets.find('tr[data-id=' + this.sCurrentRecordId + ']').replaceWith(sChangeset);
  this.hideEditFrame();
};

CHANGESETS.Interface.prototype.showErrors = function (aErrors) {
  this.jqErrors.html('<ul><li>' + aErrors.join('</li><li>') + '</li></ul>');
  this.jqErrorFrame.removeClass('hidden');
};


// utility functions

CHANGESETS.Interface.prototype.hideErrors = function () {
  this.jqErrorFrame.addClass('hidden');
};

CHANGESETS.Interface.prototype.showEditFrame = function () {
  this.jqEditFrame.removeClass('hidden');
  this.jqBtnNew.add('button.btn-edit').attr('disabled', 'disabled');
};

CHANGESETS.Interface.prototype.hideEditFrame = function () {
  delete this.sCurrentRecordId;
  this.jqEditFrame.addClass('hidden');
  this.hideErrors();
  this.jqEditFrameForm.get(0).reset();
  this.jqBtnNew.add('button.btn-edit').attr('disabled', '');
};
