class CartItemsController < ApplicationController

    
    def create
      # find user by id
      user = @current_user
  
      # Create a new cart_item
      @cart_item = user.carts.first.cart_items.create!(cart_params)
  
      if @cart_item.save
        render json: @cart_item, status: :created, location: @cart_item
      else
        # puts @cart_item.errors.full_messages # Log errors for debugging
        render json: @cart_item.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def cart_params
        # puts params.inspect # Log received parameters for debugging
        params.permit(:sku, :name, :salePrice, :image, :quantity, :cart_id)
    end
  end




