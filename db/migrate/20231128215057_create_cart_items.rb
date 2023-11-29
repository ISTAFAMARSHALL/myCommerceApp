class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.string :image
      t.string :name
      t.string :salePrice
      t.string :sku
      t.string :cart_id
      t.integer :quantity
      
      t.timestamps
    end
  end
end
