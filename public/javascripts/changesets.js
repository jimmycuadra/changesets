that = '';

// set up
CS.Changesets = function(options) {
  that = this;
  this.saveDefaults();
  this.setupBindings();
  this.attachBindings();
}

// store original values of all inputs
CS.Changesets.prototype.saveDefaults = function($inputs) {
  if ($inputs == undefined) {
    $inputs = $('input');
  }
  
  $inputs.each(function() {
    var $this = $(this);
    $this.data('default', $this.val());
  });
}

CS.Changesets.prototype.loadDefaults = function($inputs) {
  $inputs.each(function() {
    var $this = $(this);
    $this.val($this.data('default'));
  });
}

// define custom events
CS.Changesets.prototype.setupBindings = function() {  
  $('article')
  
  .live('delete', function(e) {
    var $t = $(e.target).closest('article');
    
    if (!confirm('Are you sure you want to delete ' + $t.attr('data-rev') + '?')) {
      return false;
    }
    
    
    $.post(
      '/changesets/' + that.getRecordID($t),
      {
        '_method': 'delete'
      },
      that.handleDelete($t)
    );
  })
  
  .live('edit', function(e) {
    that.handleToggle(e, false);
  })
  
  .live('merge', function(e) {
    var $thisRow = $(e.target).closest('article'),
        $thatRow = $thisRow.next('article'),
        newMerged = $thisRow.hasClass('unmerged'),
        titleText = newMerged ? 'Unm' : 'M';
    
    $.post(
      '/changesets/' + that.getRecordID($thisRow),
      {
        '_method': 'put',
        'changeset[merged]': newMerged
      },
      function() {
        $thisRow.add($thatRow).toggleClass('unmerged');
        $thisRow.find('a.merge img').attr('title', titleText + 'erge ' + $thisRow.attr('data-rev'));
      }
    );
  })
    
  .live('save', function(e) {
    var $thisRow = $(e.target).closest('article'),
        $thatRow = $thisRow.prev('article'),
        $loading = $thisRow.find('img.loading').toggleClass('hidden');
    
    $('div.errors').remove();
    
    $.ajax({
      'url': '/changesets/' + that.getRecordID($thisRow) + '.js',
      'type': 'POST',
      'data': $thisRow.find('form').serialize(),
      'complete': that.handleSave($thisRow, $thatRow, $loading),
      'dataType': 'html'
    });
  })
  
  .live('cancel', function(e) {
    that.handleToggle(e, true);
  })
  
  .live('toggle-new', function(e) {
    var $this = $(this);
    
    if ($('#add-toggle section:first').hasClass('hidden')) {
      $this.find('input').val('');
      $('div.errors').remove();
    }
    $(this).slideToggle(350);
    $('#add-toggle section').toggleClass('hidden');
  })
    
  .live('save-new', function(e) {
    var $t = $(e.target).closest('article'),
        $loading = $t.find('img.loading').toggleClass('hidden');
    
    $('div.errors').remove();
    
    $.ajax({
      'url': '/changesets.js',
      'type': 'POST',
      'data': $t.find('form').serialize(),
      'complete': that.handleSaveNew($t, $loading),
      'dataType': 'html'
    });
  });
}

CS.Changesets.prototype.handleSaveNew = function($thisRow, $loading, data) {
  return function(xhr) {
    var $newArticle = $(xhr.responseText).insertAfter($thisRow);

    if (xhr.status != 422) {
      $('div.errors').remove();
      $thisRow.find('input').val('');
      that.saveDefaults($newArticle.find('input'));
      that.flash('The changeset was created.');
      $('#cs-new').trigger('toggle-new');
    } else {
      that.flash('The changeset could not be created.', true);
    }
    
    $loading.toggleClass('hidden');
  }
}

CS.Changesets.prototype.handleSave = function($thisRow, $thatRow, $loading, data) {
  return function(xhr) {
    if (xhr.status == 422) {
      $thisRow.after($(xhr.responseText));
      $loading.toggleClass('hidden');
      that.flash('The changeset could not be updated.', true);
    } else {
      $thatRow.remove();
      // workaround until http://dev.jquery.com/ticket/5316 is fixed
      // var $updatedArticle = $(xhr.responseText).replaceAll($thisRow);
      var $xhrRT = $(xhr.responseText);
      var $updatedArticle = $xhrRT.wrap('<div/>').parent().replaceAll($thisRow).replaceWith($xhrRT);
      // re-save default values for all inputs since the above workaround returns the wrong object
      that.saveDefaults();
      that.flash('The changeset was updated.');
    }
  }
}

CS.Changesets.prototype.handleDelete = function($t) {
  $t.add($t.next('article')).fadeOut(750, function() {
    $(this).remove();
  });
}

CS.Changesets.prototype.handleToggle = function(e, isCancel) {
  var $thisRow = $(e.target).closest('article'),
      $thatRow;
  
  if (isCancel) {
    $thatRow = $thisRow.prev('article');
    that.loadDefaults($thisRow.find('input'));
    $('div.errors').remove();
  } else {
    $thatRow = $thisRow.next('article');
  }

  $thisRow.add($thatRow).toggleClass('hidden');
}

CS.Changesets.prototype.getRecordID = function($t) {
  var csID = $t.closest('article').attr('id');
  return csID.substring(csID.lastIndexOf('-') + 1);
}

CS.Changesets.prototype.flash = function(message, isError) {
  var $flash = $('#flash').text(message),
      flashWidth = $flash.width(),
      $window = $(window),
      winWidth = $window.width(),
      scrollTop = $window.scrollTop();
  
  if (isError) {
    $flash.addClass('error');
  } else {
    $flash.removeClass('error');
  }
    
  $flash.css({
    'top': scrollTop + 15,
    'left': (winWidth - flashWidth) / 2
  }).show().animate({
    'void': 0
  }, 1500).fadeOut(1500);
}

// attach custom events to controls
CS.Changesets.prototype.attachBindings = function() {
  $('section.actions').live('click', function(e) {
    e.preventDefault();
    
    var $t = $(e.target).parent(),
        action = $t.attr('class');
        
    $(this).trigger({
      'type': action,
      'csID': that.getRecordID($t)
    })
  });
  
  $('a.add').click(function(e) {
    e.preventDefault();
    
    $('#cs-new').trigger('toggle-new');
  });
  
  $('#cs-new form').submit(function(e) {
    e.preventDefault();
    
    $(this).trigger('save-new');
  })
  
  $('form').live('keypress', function(e) {
    if (e.keyCode == 13) {
      return false;
    }
  });
}
