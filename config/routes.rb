ActionController::Routing::Routes.draw do |map|
  map.resources :changesets, :except => 'show', :collection => { :all => :get }
  map.root :controller => 'changesets'
end
