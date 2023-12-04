# config/initializers/rack_attack.rb

class Rack::Attack
    throttle('requests by ip', limit: 5, period: 1) do |req|
      req.ip
    end
  end
  