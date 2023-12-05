#!/usr/bin/env bash
# exit on error
set -o errexit

# Add build commands for front end
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
bundle exec rake db:drop
bundle exec rake db:create

# Add build commands for back end
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rails db:migrate



# bundle exec rake db:migrate
bundle exec rake db:seed