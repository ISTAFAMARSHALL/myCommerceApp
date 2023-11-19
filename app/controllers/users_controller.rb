class UsersController < ApplicationController

    skip_before_action :authorize
    
    # , only: [:create]

    def index
        users = User.all 
        render json: users, status: :ok
    end

    def show
        render json: @current_user
    end

    def me
        render json: @current_user, status: :ok
    end

    def create
        user = User.create!(user_params).authenticate(params[:password])
        render json: user, status: :created
    end

    def update
        @current_user.update!(update_user_params)
        render json: @current_user, status: :accepted
    end

    def destroy
        # user = User.find(params[:id]
        @current_user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit( :name , :email , :username , :password , :password_confirmation, :image )
    end

    def update_user_params
        params.permit( :name , :email , :username, :image )
    end

end
