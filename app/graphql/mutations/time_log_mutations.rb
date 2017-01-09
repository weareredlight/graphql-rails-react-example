module TimeLogMutations
  Create = GraphQL::Relay::Mutation.define do
    name 'CreateTimeLog'

    # Accessible from `input` in the resolve function:
    input_field :project_name, !types.String
    input_field :name,         !types.String
    input_field :started_at,   !DateTimeType
    input_field :stopped_at,   DateTimeType

    return_type TimeLogType

    # The resolve proc is where you alter the system state.
    resolve ->(obj, args, ctx) {
      project = Project.find_or_create_by(name: args[:project_name])
      TimeLog.create(
        args.to_h
            .except('project_name')
            .merge(project_id: project.id)
      )
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name 'UpdateTimeLog'

    # Accessible from `input` in the resolve function:
    input_field :id,         !types.ID
    input_field :project_id, types.ID
    input_field :name,       types.String
    input_field :started_at, DateTimeType
    input_field :stopped_at, DateTimeType
    #...

    return_type TimeLogType

    # The resolve proc is where you alter the system state.
    resolve ->(obj, args, ctx) {
      time_log = TimeLog.find(args[:id])
      time_log.update_attributes(
        args.to_h.except('id', 'project_name')
      )

      if args[:project_name].present?
        project = Project.find_or_create_by(name: args[:project_name])
        time_log.update_attribute(:project_id, project.id)
      end

      return time_log
    }
  end
end
