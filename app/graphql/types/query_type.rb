QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema'

  field :project, ProjectType do
    argument :id, !types.ID
    description 'Find a Project by ID'
    resolve ->(obj, args, ctx) { Project.find(args["id"]) }
  end

  field :projects, types[ProjectType] do
    description 'Return all projects'
    resolve ->(obj, args, ctx) { Project.all }
  end

  field :time_log, TimeLogType do
    argument :id, !types.ID
    description 'Find a TimeLog by ID'
    resolve ->(obj, args, ctx) { TimeLog.find(args["id"]) }
  end

  field :time_logs, types[TimeLogType] do
    description 'Return all time logs'
    resolve ->(obj, args, ctx) { TimeLog.all }
  end
end
