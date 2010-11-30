require 'test_helper'

class ChangesetsControllerTest < ActionController::TestCase
  context "on GET to index" do
    setup do
      get :index
    end

    should assign_to(:changesets)
    should respond_with(:success)
    should render_template(:index)
  end

  context "on GET to all" do
    setup do
      get :all
    end

    should assign_to(:changesets)
    should respond_with(:success)
    should render_template(:index)
  end

  context "on valid POST to create" do
    setup do
      post :create, :format => 'json', :changeset => Factory.attributes_for(:changeset)
    end

    should respond_with(:success)
    should render_template(:create)
  end

  context "on invalid POST to create" do
    setup do
      post :create, :format => 'json'
    end

    should respond_with(:success)
    should render_template(:errors)
  end
end
