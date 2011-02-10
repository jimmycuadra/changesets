require 'spec_helper'

describe Changeset do
  ['revision', 'ticket'].each do |attribute|
    describe "##{attribute}" do
      before(:each) do
        @changeset = Factory(:changeset)
      end

      it "is a number" do
        @changeset.send("#{attribute}=", "foo")
        @changeset.valid?
        @changeset.errors[attribute].should include("is not a number")
      end

      it "is an integer" do
        @changeset.send("#{attribute}=", 1.1)
        @changeset.valid?
        @changeset.errors[attribute].should include("must be an integer")
      end

      it "is a positive integer" do
        @changeset.send("#{attribute}=", -1)
        @changeset.valid?
        @changeset.errors[attribute].should include("must be greater than 0")
      end
    end
  end

  describe "#revision" do
    before(:each) do
      @changeset = Factory.build(:changeset)
    end

    it "must exist" do
      @changeset.revision = nil
      @changeset.valid?
      @changeset.errors[:revision].should include("can't be blank")
    end

    it "must be unique" do
      @changeset.save
      @another_changeset = Factory.build(:changeset, :revision => @changeset.revision)
      @another_changeset.valid?
      @another_changeset.errors[:revision].should include("has already been taken")
    end
  end

  describe "#merged" do
    it "must be a boolean" do
      @changeset = Factory.build(:changeset)
      @changeset.merged = true
      @changeset.valid?
      @changeset.errors[:merged].should be_empty
      @changeset.merged = false
      @changeset.valid?
      @changeset.errors[:merged].should be_empty
    end
  end

  describe "#unmerged (scope)" do
    it "should only show unmerged changesets" do
      merged = Factory(:changeset, :revision => 1, :merged => true)
      unmerged = Factory(:changeset, :revision => 2, :merged => false)
      Changeset.unmerged.should == [unmerged]
    end
  end
end
