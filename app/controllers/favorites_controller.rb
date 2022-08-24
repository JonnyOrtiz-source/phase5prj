class FavoritesController < ApplicationController
    def index
        render json: Favorite.all, status: :ok
    end

    def create
        favorite = Favorite.create!(favorite_params)
        render json: favorite, status: :created
    end

    def show
        favorite = Favorite.find(params[:id])
        render json: favorite, status: :ok

    end

    def destroy
        favorite = Favorite.find(params[:id])
        favorite.destroy
        head :no_content
    end


    private

    def favorite_params
        params.permit(:wishlist_id, :service_id)
    end

end
