require 'test_helper'

class ChangesetTest < ActiveSupport::TestCase
  context "A changeset" do
    setup do
      @changeset = Factory(:changeset)
    end

    subject { @changeset }

    should_validate_numericality_of :revision, :ticket
    should_not_allow_values_for :revision, 0, 1.1
    should_not_allow_values_for :ticket, 0, 1.1
    should_validate_presence_of :revision
    should_validate_uniqueness_of :revision
    should_allow_values_for :merged, true, false
    should_have_named_scope :unmerged, :conditions => { :merged => false }
  end
end
