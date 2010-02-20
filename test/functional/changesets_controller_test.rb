require 'test_helper'

class ChangesetsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:changesets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create changeset" do
    assert_difference('Changeset.count') do
      post :create, :changeset => { }
    end

    assert_redirected_to changeset_path(assigns(:changeset))
  end

  test "should show changeset" do
    get :show, :id => changesets(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => changesets(:one).to_param
    assert_response :success
  end

  test "should update changeset" do
    put :update, :id => changesets(:one).to_param, :changeset => { }
    assert_redirected_to changeset_path(assigns(:changeset))
  end

  test "should destroy changeset" do
    assert_difference('Changeset.count', -1) do
      delete :destroy, :id => changesets(:one).to_param
    end

    assert_redirected_to changesets_path
  end
end
