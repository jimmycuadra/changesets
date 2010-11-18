require 'test_helper'

class ChangesetTest < ActiveSupport::TestCase
  context "A changeset" do
    setup do
      @changeset = Factory(:changeset)
    end

    subject { @changeset }

    should validate_numericality_of(:revision)
    should validate_numericality_of(:ticket)
    should_not allow_value(0).for(:revision)
    should_not allow_value(1.1).for(:revision)
    should_not allow_value(0).for(:ticket)
    should_not allow_value(1.1).for(:ticket)
    should validate_presence_of(:revision)
    should validate_uniqueness_of(:revision)
    should allow_value(true).for(:merged)
    should allow_value(false).for(:merged)
  end

  should 'look up only unmerged changesets' do
    merged = Factory(:changeset, :revision => 1, :merged => true)
    unmerged = Factory(:changeset, :revision => 2, :merged => false)

    assert_equal [unmerged], Changeset.unmerged
  end
end
