class ProductsController < ApplicationController

  skip_before_action :authorize

  before_action :set_api_key

  def index
    @products = fetch_products(params[:category])
    render json: @products
  end

  def show
    @product = fetch_product(params[:sku])
    render json: @product
  end

  private

  def set_api_key
    @api_key = 'pF95ksO2AJ45DOumUGSfHKsl'  # Replace YOUR_BESTBUY_API_KEY with your actual BestBuy API key
  end

  def fetch_product(item_params)
    sleep(1)
    puts "fetching product with sku #{params}"
    base_url = "https://api.bestbuy.com/v1/products(sku=#{params[:id]})?apiKey=#{@api_key}&format=json"
    # api_params = {
    #   apiKey: @api_key,
    #   format: 'json',
    #   show: 'sku,name,salePrice,image',
    # }

    # Make the API request
    response = RestClient.get(base_url)

    # Parse and return the JSON response
    JSON.parse(response.body)

    rescue RestClient::ExceptionWithResponse => e
    # Handle API request errors
    Rails.logger.error("BestBuy API request failed: #{e.response}")
    []
  end

  def fetch_products(category = nil)
    sleep(1)
      base_url = 'https://api.bestbuy.com/v1/products'
      api_params = {
      apiKey: @api_key,
      pageSize: 100,
      page: 1,
      format: 'json',
      show: 'sku,name,salePrice,image'
      # Add more parameters as needed, e.g., categoryPath.name, etc.
    }

    # Add category parameter if provided
    api_params[:categoryPath.name] = category if category

    # Make the API request
    response = RestClient.get(base_url, params: api_params)

    # Parse and return the JSON response
    JSON.parse(response.body)

  rescue RestClient::ExceptionWithResponse => e
    # Handle API request errors
    Rails.logger.error("BestBuy API request failed: #{e.response}")
    []
  end

end
