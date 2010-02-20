class CreateChangesets < ActiveRecord::Migration
  def self.up
    create_table :changesets do |t|
      t.integer :revision, :null => false
      t.integer :ticket
      t.boolean :merged, :null => false, :default => 0
      t.string :description
      t.string :notes

      t.timestamps
    end
    
    add_index :changesets, :revision, :unique => true
  end

  def self.down
    drop_table :changesets
  end
end
