class CartItemsController < ApplicationController

    def create

        # find user by id
        user = @current_user

        
        # Create a new cart_item
        @cart_item = user.carts.first.cart_items.new(cart_params)
        
        if @cart_item.save
            render json: @cart_item, status: :created, location: @cart_item
        else
            render json: @cart_item.errors, status: :unprocessable_entity
        end

    end

    private

    def cart_params
        params.permit(:sku, :name, :salePrice, :image, :quantity)
    end
    

end
