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

  describe "#update" do
    before(:each) do
      @changeset = Factory(:changeset)
    end

    context "when valid" do
      before(:each) do
        put :update, :id => @changeset.to_param, :changeset => { :description => "updated" }, :format => :json
      end

      it "saves the record" do
        assigns(:changeset).errors.should be_empty
      end

      it "renders the create template" do
        response.should render_template("changesets/create")
      end
    end

    context "when invalid" do
      before(:each) do
        put :update, :id => @changeset.to_param, :changeset => { :revision => "foo" }, :format => :json
      end

      it "does not save the record" do
        assigns(:changeset).errors.should_not be_empty
      end

      it "renders the error template" do
        response.should render_template("changesets/errors")
      end
    end
  end

  describe "#destroy" do
    before(:each) do
      @changeset = Factory(:changeset)
      delete :destroy, :id => @changeset.to_param
    end

    it "destroys the changeset" do
      Changeset.exists?(assigns(:changeset)).should_not be
    end
  end
end
