# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Create Users
10.times do |index|

    imageUrl = 'https://xsgames.co/randomusers/avatar.php?g=male';
    
    name = "Anthony";
    username = "admin#{index + 1}";
    email = "admin#{index + 1}@mycommerce.com";
    password = "admin#{index + 1}";
    image = imageUrl

    user = User.create!(email: email, image: image, password: password, password_confirmation: password, username: username, name: name)

    user.carts.create!

end
