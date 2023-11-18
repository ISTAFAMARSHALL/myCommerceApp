class OrdersController < ApplicationController

    def index
        orders = Order.all 
        render json: orders, status: :ok
    end

    def show
        order = Order.find(params[:id])
        render json: order, status: :ok
    end

    def create
        order = @current_user.orders.create!(order_params)
        render json: order, status: :created
    end

    def update
        order = @current_user.orders.find(params[:id])
        updated_order = order.update!(update_order_params)
        render json: order, status: :accepted
    end

    def destroy
        order = @current_user.orders.find(params[:id])
        order.destroy
        render json: order
    end

    private

    def order_params
        params.permit(:name, :number_of_guests, :day, :time, :restaurant_id )
    end

    def update_order_params
        params.permit(:name, :number_of_guests, :day, :time)
    end

end
