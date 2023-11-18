class Product < ApplicationRecord
    belongs_to :orders
    has_many :users, through: :orders
end
