# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

1.upto(10) do |i|
  p = Project.create!(name: "Project #{i}")
  1.upto(10) do |j|
    p.time_logs.create!(
      name: "Task #{i} #{j}",
      started_at: (j+1).minutes.ago,
      stopped_at: j.minutes.ago
    )
  end
end
