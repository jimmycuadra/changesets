Changesets::Application.routes.draw do
  resources :changesets, :only => [:index, :create, :update, :destroy] do
    get 'all', :on => :collection
  end
  
  root :to => 'changesets#index'
end
