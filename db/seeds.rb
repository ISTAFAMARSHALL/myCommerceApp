# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Create Users
# 10.times do |index|

#     imageUrl = 'https://xsgames.co/randomusers/avatar.php?g=male';
    
#     name = "Anthony";
#     username = "admin#{index + 1}";
#     email = "admin#{index + 1}@mycommerce.com";
#     password = "admin#{index + 1}";
#     image = imageUrl

#     user = User.create!(email: email, image: image, password: password, password_confirmation: password, username: username, name: name)

#     user.carts.create!

#     product1 = {sku: 1000006, name: 'Spy Kids: All the Time in the World [Includes Digital Copy] [Blu-ray] [2011]', salePrice: 14.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1000/1000006_sa.jpg', quantity: '1'}

#     user.carts.first.cart_items.create!(product1)

#     product2 = {sku: 1000007, name: 'The Smurfs [Includes Digital Copy] [Blu-ray] [2011]', salePrice: 14.99, image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1000/1000007_sa.jpg', quantity: '1'}

#     user.carts.first.cart_items.create!(product2)

#     items =  [product2 , product1 ]

#     def calculate_total_amount(items)
#         # Implement your logic to calculate the total amount based on items
#         items.sum { |item| item[:salePrice].to_i * item[:quantity].to_i }
#     end

#     # order = user.orders.create!(cart_id: user.id, order_items: items , total_amount: calculate_total_amount(items))


# end
