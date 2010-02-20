# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_changesets_session',
  :secret      => 'ccf6bf61c43e153e8812a4750badb44ff790162504b17bd7aca7db307c3010ef82b55a0750dbcf58a3adf247d09339a5093895240c66cf3eaefc6f1b56f99295'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
