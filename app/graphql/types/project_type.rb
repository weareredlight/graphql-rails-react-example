ProjectType = GraphQL::ObjectType.define do
  name 'Project'
  description 'A project'

  # `!` marks a field as "non-null"
  field :id,   !types.ID
  field :name, !types.String

  field :time_logs, types[TimeLogType] do
    description "This project's time logs"
    resolve ->(obj, args, ctx) { obj.time_logs }
  end
end
