# # class OrdersController < ApplicationController

# #     def index
# #         orders = Order.all 
# #         render json: orders, status: :ok
# #     end

# #     def show
# #         order = Order.find(params[:id])
# #         render json: order, status: :ok
# #     end

# #     def create
# #         order = @current_user.orders.create!(order_params)
# #         render json: order, status: :created
# #     end

# #     def update
# #         order = @current_user.orders.find(params[:id])
# #         updated_order = order.update!(update_order_params)
# #         render json: order, status: :accepted
# #     end

# #     def destroy
# #         order = @current_user.orders.find(params[:id])
# #         order.destroy
# #         render json: order
# #     end

# #     private

# #     def order_params
# #         params.permit(:name, :number_of_guests, :day, :time, :restaurant_id )
# #     end

# #     def update_order_params
# #         params.permit(:name, :number_of_guests, :day, :time)
# #     end

# # end

# # app/controllers/orders_controller.rb

# class OrdersController < ApplicationController
#     def create
#       user = User.find(params[:user_id])
#       items = params[:items]
  
#       # Perform any additional processing as needed (e.g., calculating total amount)
  
#       order = Order.create(user: user, total_amount: calculate_total_amount(items))
  
#       items.each do |item|
#         OrderItem.create(order: order, product_id: item[:product_id], quantity: item[:quantity])
#       end
  
#       render json: { order_id: order.id, total_amount: order.total_amount }, status: :created
#     end
  
#     private
  
#     def calculate_total_amount(items)
#       # Implement your logic to calculate the total amount based on items
#       items.sum { |item| Product.find(item[:product_id]).price * item[:quantity] }
#     end
#   end
  
# app/controllers/orders_controller.rb

# class OrdersController < ApplicationController

#   def show
#     order = Order.find(params[:id])
#     render json: order, status: :ok
#   end

#   def create
#     # user = User.find(params[:user_id])
#     items = params[:items]

#     puts items

#     items.each do |item|
      
#       item = CartItem.find(item[:id])

#       order_items << item

#     end

#     # Perform any additional processing as needed (e.g., calculating total amount)

#     order = @current_user.orders.create!(cart_id: @current_user.id, order_items: order_items , total_amount: calculate_total_amount(items))

#     # render json: { order_id: order.id, total_amount: order.total_amount }, status: :created

#     render json: order, status: :created

#   end

#   private

#   def calculate_total_amount(items)
#     # Implement your logic to calculate the total amount based on items
#     items.sum { |item| item[:salePrice].to_f * item[:quantity].to_f }
#   end

# end

# class OrdersController < ApplicationController
#   def create
#     user = User.find(params[:user_id])
#     items = params[:items]
#     all = []

    

#     items.each do |item_params|

#       # Use the correct key to find the CartItem
#       cart_item = CartItem.find(item_params[:cart_items_id])

#       # Create an OrderItem instance based on the CartItem and the quantity
#       all << cart_item

#       puts all

#     end

#     Order.create!(user_id: user.id, order_items: all, total_amount: calculate_total_amount(all))
#     # Perform any additional processing as needed (e.g., calculating the total amount)

#     # order = user.orders.create!( total_amount: calculate_total_amount(all))

#     # puts order

#     # render json: order, status: :created
#   end

#   private

#   def calculate_total_amount(order_items)
#     # Implement your logic to calculate the total amount based on order_items
#     order_items.sum { |order_item| order_item[:salePrice].to_f * order_item[:quantity].to_f }
#   end

# end

class OrdersController < ApplicationController  
  
  def index
    orders = Order.all.where(user_id: @current_user.id)
    render json: orders, status: :ok
  end

  def show 
    order = Order.find(params[:id])
    render json: order, status: :ok
  end

  def create
    user = User.find(params[:user_id])
    items = params[:items]
    order_items = []
    all = []

    items.each do |item_params|
      cart_item = CartItem.find(item_params[:cart_items_id])

      # t = to_s(cart_item)

      # Build an OrderItem association with the Order
      # order_items << OrderItem.new(cart_item: cart_item, quantity: item_params["quantity"])
      order_items << "OrderItem id: #{cart_item.id}, name: #{cart_item.name}, image: #{cart_item.image} , thumbnailImage: #{cart_item.thumbnailImage} , salePrice: #{cart_item.salePrice}, sku: #{cart_item.sku}, cart_id: #{cart_item.cart_id}, quantity: #{cart_item.quantity}"

      all << cart_item
    end

    @cart = Cart.find(user.id)
    @cart.update(cart_items: [])
    
    # # Create an Order instance and associate insert order_items
    order = Order.create!(user_id: user.id, cart_id: user.id, order_items: order_items, total_amount: calculate_total_amount(all))


    # order = user.orders.create!(order_items: order_items, total_amount: calculate_total_amount(all)
    # )

    puts order
    
    render json: order, status: :created
  end

  private

  def calculate_total_amount(all)
    # Implement your logic to calculate the total amount based on order_items
    all.sum { |order_item| order_item[:salePrice].to_f * order_item[:quantity].to_f }
  end

  def to_s(str)
    "OrderItem id: #{cart_item.id}, name: #{cart_item.name}, salePrice: #{cart_item.salePrice}, sku: #{cart_item.sku}, cart_id: #{cart_item.cart_id}, quantity: #{cart_item.quantity} , image: #{cart_item.image} , thumbnailImage: #{cart_item.thumbnailImage}"
  end

end
