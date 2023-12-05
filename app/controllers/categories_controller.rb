class CategoriesController < ApplicationController

    skip_before_action :authorize
    before_action :set_api_key

    def show
        @product = fetch_product_or_products(params[:id])
        render json: @product
    end

    private

    def set_api_key
      @api_key = 'pF95ksO2AJ45DOumUGSfHKsl'  # Replace YOUR_BESTBUY_API_KEY with your actual BestBuy API key
    end
  
    def fetch_product_or_products(item_params)
      puts "fetching product with sku #{item_params}"
      # sleep(1)
    
      if item_params.to_i.to_s == item_params
        # If the parameter is a number, fetch a single product by SKU
        fetch_product_by_sku(item_params)
      else
        # If the parameter is a word, fetch products by category
        fetch_products_by_category(item_params)
      end
    end

    def fetch_product_by_sku(sku)
        puts "Fetching product with SKU #{params[:id]}"
        base_url = "https://api.bestbuy.com/v1/products(sku=#{params[:id]})?apiKey=#{@api_key}&sort=regularPrice.desc&format=json"
        make_api_request(base_url)
      end
      
      def fetch_products_by_category(category)
        puts "Fetching products for #{category} page"
        base_url = "https://api.bestbuy.com/v1/products(categoryPath.name=#{params[:id]}*)?apiKey=#{@api_key}&sort=customerReviewCount,regularPrice.desc&pageSize=20&format=json"
        make_api_request(base_url)
      end
      
      def make_api_request(url)
        response = RestClient.get(url)
        JSON.parse(response.body)
      
      rescue RestClient::ExceptionWithResponse => e
        # Handle API request errors
        Rails.logger.error("BestBuy API request failed: #{e.response}")
        []
    end
end
