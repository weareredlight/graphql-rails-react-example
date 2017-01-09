class CreateTimeLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :time_logs do |t|
      t.references :project, foreign_key: true
      t.string :name
      t.datetime :started_at
      t.datetime :stopped_at

      t.timestamps
    end
  end
end
