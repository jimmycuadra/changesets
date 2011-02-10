require 'spec_helper'

describe ChangesetsController do
  describe "#index" do
    it "displays the last 10 unmerged changesets" do
      changeset_ids = []
      1.upto(11) do |n|
        changeset = Factory(:changeset, :revision => n)
        changeset_ids.push changeset.id
      end
      changeset_ids.reverse!
      changeset_ids.pop

      get :index
      assigns(:changesets).map(&:id).should == changeset_ids
    end
  end
end
