class CartItemsController < ApplicationController

  def destroy
    # find cart_item by id
    cart_item = CartItem.find(params[:id])

    # Delete the cart_item
    cart_item.destroy
  end

  def update
    # find cart_item by id
    cart_item = CartItem.find(params[:id])

    # Update the cart_item
    cart_item.update!(cart_params)

    render json: cart_item
  end

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
      params.permit(:sku, :name, :salePrice, :image, :thumbnailImage, :quantity, :cart_id)
  end

end




