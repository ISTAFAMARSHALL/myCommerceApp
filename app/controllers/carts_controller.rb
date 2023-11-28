# app/controllers/carts_controller.rb

class CartsController < ApplicationController
    before_action :set_cart
    
    # , only: [:show, :update, :destroy]
    
    def index
      # Display all carts (optional)
      @carts = Cart.all
      render json: @carts
    end
  
    def show
      # Display a specific cart
      render json: @cart
    end
  
    def create
      # Create a new cart
      @cart = Cart.new(cart_params)
      
      if @cart.save
        render json: @cart, status: :created, location: @cart
      else
        render json: @cart.errors, status: :unprocessable_entity
      end
    end
  
    def update
      # Update a cart
      if @cart.update(cart_params)
        render json: @cart
      else
        render json: @cart.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      # Delete a cart
      @cart.destroy
    end
  
    private
  
    def set_cart
      @cart = Cart.find(params[:id])
    end
    
    def cart_params
      params.permit(:user_id, :product_id, :quantity)
    end
  end
  