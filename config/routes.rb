ActionController::Routing::Routes.draw do |map|
  map.resources :changesets, :except => 'show'
  map.root :controller => 'changesets'
end
