class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      
      t.string :total_amount
      t.string :cart_id
      t.string :order_items
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
