# # # class OrdersController < ApplicationController

# # #     def index
# # #         orders = Order.all 
# # #         render json: orders, status: :ok
# # #     end

# # #     def show
# # #         order = Order.find(params[:id])
# # #         render json: order, status: :ok
# # #     end

# # #     def create
# # #         order = @current_user.orders.create!(order_params)
# # #         render json: order, status: :created
# # #     end

# # #     def update
# # #         order = @current_user.orders.find(params[:id])
# # #         updated_order = order.update!(update_order_params)
# # #         render json: order, status: :accepted
# # #     end

# # #     def destroy
# # #         order = @current_user.orders.find(params[:id])
# # #         order.destroy
# # #         render json: order
# # #     end

# # #     private

# # #     def order_params
# # #         params.permit(:name, :number_of_guests, :day, :time, :restaurant_id )
# # #     end

# # #     def update_order_params
# # #         params.permit(:name, :number_of_guests, :day, :time)
# # #     end

# # # end

# # # app/controllers/orders_controller.rb

# # class OrdersController < ApplicationController
# #     def create
# #       user = User.find(params[:user_id])
# #       items = params[:items]
  
# #       # Perform any additional processing as needed (e.g., calculating total amount)
  
# #       order = Order.create(user: user, total_amount: calculate_total_amount(items))
  
# #       items.each do |item|
# #         OrderItem.create(order: order, product_id: item[:product_id], quantity: item[:quantity])
# #       end
  
# #       render json: { order_id: order.id, total_amount: order.total_amount }, status: :created
# #     end
  
# #     private
  
# #     def calculate_total_amount(items)
# #       # Implement your logic to calculate the total amount based on items
# #       items.sum { |item| Product.find(item[:product_id]).price * item[:quantity] }
# #     end
# #   end
  
# # app/controllers/orders_controller.rb

# class OrdersController < ApplicationController

#   def show
#     order = Order.find(params[:id])
    
#     allItems = order.order_items

#     render json: { order_id: order.id, order_items: allItems, total_amount: order.total_amount }, status: :created

#     # render json: order, status: :ok
#   end

#   def create
#     # user = User.find(params[:user_id])
#     items = params[:items]
#     order_items = []
    

#     items.collect do |item|
      
#       item = CartItem.find(item[:id])

     
#       id = item.id;
#       name = item.name;
#       salePrice = item.salePrice;
#       sku = item.sku;
#       quantity = item.quantity;
#       image = item.image

      
#       order_items.push(id: id, name: name, salePrice: salePrice, sku: sku, quantity: quantity, image: image)


#     end

#     puts order_items

#     # Perform any additional processing as needed (e.g., calculating total amount)

#     order = @current_user.orders.create!(cart_id: @current_user.id, order_items: order_items , total_amount: calculate_total_amount(order_items))

#     # render json: { order_id: order.id, total_amount: order.total_amount }, status: :created

#     render json: order, status: :created


#   end

#   private

#   def calculate_total_amount(items)
#     # Implement your logic to calculate the total amount based on items
#     items.sum { |item| item[:salePrice].to_f * item[:quantity].to_f }
#   end

# end

# app/controllers/orders_controller.rb
class OrdersController < ApplicationController
  def create
    user = User.find(params[:user_id])
    items = params[:items]

    order = user.orders.create!(total_amount: calculate_total_amount(items))
    
    items.each do |item|
      product = CartItem.find(item[:id])
      order_item = order.order_items.create!(product: product, quantity: item[:quantity])
    end

    render json: { order_id: order.id, total_amount: order.total_amount }, status: :created
  end

  private

  def calculate_total_amount(items)
    items.sum { |item| CartItem.find(item[:id]).price * item[:quantity] }
  end
end
