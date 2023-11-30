class Order < ApplicationRecord

  belongs_to :cart
  belongs_to :user
  has_many :cart_items
  has_many :order_items, dependent: :destroy

end
