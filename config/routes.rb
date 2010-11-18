ChangesetsDev::Application.routes.draw do
  resources :changesets, :except => 'show' do
    get 'all', :on => :collection
  end
  
  root :to => 'changesets#index'
end
