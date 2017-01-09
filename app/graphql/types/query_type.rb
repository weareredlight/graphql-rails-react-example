QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema'

  field :project, ProjectType do
    argument :id, !types.ID
    description 'Find a Project by ID'
    resolve ->(obj, args, ctx) { Project.find(args[:id]) }
  end

  field :projects, types[ProjectType] do
    description 'Return all projects'
    resolve ->(obj, args, ctx) { Project.all }
  end

  field :time_log, TimeLogType do
    argument :id,      types.ID
    argument :running, types.Boolean
    description 'Find a TimeLog by ID'
    resolve ->(obj, args, ctx) {
      if args[:id]
        TimeLog.find(args[:id])
      elsif args[:running]
        TimeLog.where(stopped_at: nil).last
      else
        nil
      end
    }
  end

  field :time_logs, types[TimeLogType] do
    description 'Return all finished time logs'
    resolve ->(obj, args, ctx) {
      TimeLog.where.not(stopped_at: nil)
             .order(started_at: :desc)
             .includes(:project)
    }
  end
end
