class UserSerializer < ActiveModel::Serializer

  attributes :id, :name, :email, :image, :username

  has_many :orders
  has_many :carts
  
   
end
