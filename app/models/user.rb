class User < ApplicationRecord

    has_secure_password

    has_many :carts
    has_many :orders
    has_many :products, through: :orders
    
    # validates :username, presence: true, uniqueness: true
    # validates :password, presence: true, length: { minimum: 6 }
    # validates :password_confirmation, presence: true
    # validates :email, presence: true, uniqueness: true
    

end
