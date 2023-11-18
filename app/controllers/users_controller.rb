class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

    # def index
    #     patrons = Patron.all 
    #     render json: patrons, status: :ok
    # end

    def show
        render json: @current_user
    end

    def create
        patron = Patron.create!(patron_params).authenticate(params[:password])
        session[:user_id] ||= patron.id
        render json: patron, status: :created
    end

    def update
        @current_user.update!(update_patron_params)
        render json: @current_user, status: :accepted
    end

    def destroy
        # patron = Patron.find(params[:id]
        @current_user.destroy
        head :no_content
    end

    private

    def patron_params
        params.permit( :name , :phone_number , :email_address , :username , :password , :passwordConfirmation )
    end

    def update_patron_params
        params.permit( :name , :phone_number , :email_address , :username )
    end
    
end
