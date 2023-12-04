class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id, :quantity

  belongs_to :user
  has_many :cart_items
  

end
