TimeLogType = GraphQL::ObjectType.define do
  name 'Time Log'
  description 'A time log'

  # `!` marks a field as "non-null"
  field :id,         !types.ID
  field :name,       !types.String
  field :started_at, !DateTimeType
  field :stopped_at,  DateTimeType

  field :project, ProjectType do
    description "This time log's project"
    resolve ->(obj, args, ctx) { obj.project }
  end
end
