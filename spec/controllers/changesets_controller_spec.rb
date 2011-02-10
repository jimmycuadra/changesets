require 'spec_helper'

describe ChangesetsController do
  render_views

  [:index, :all].each do |action|
    describe "##{action}" do
      before(:each) do
        get action
      end

      it "should assign to changesets" do
        assigns(:changesets).should be
      end

      it "should render the index template" do
        response.should render_template(:index)
      end
    end
  end

  describe "#create" do
    context "when valid" do
      before(:each) do
        post :create, :changeset => Factory.attributes_for(:changeset), :format => :json
      end

      it "saves the record" do
        assigns(:changeset).should_not be_a_new_record
      end

      it "renders the create template" do
        response.should render_template(:create)
      end
    end

    context "when invalid" do
      before(:each) do
        post :create, :changeset => Factory.attributes_for(:changeset, :revision => nil), :format => :json
      end

      it "does not save the record" do
        assigns(:changeset).should be_a_new_record
      end

      it "renders the error template" do
        response.should render_template("changesets/errors")
      end
    end
  end
end
