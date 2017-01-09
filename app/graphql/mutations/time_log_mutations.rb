module TimeLogMutations
  Create = GraphQL::Relay::Mutation.define do
    name 'CreateTimeLog'

    # Accessible from `input` in the resolve function:
    input_field :project_id, !types.ID
    input_field :name,       !types.String
    input_field :started_at, !DateTimeType
    input_field :stopped_at, DateTimeType

    return_type TimeLogType

    # The resolve proc is where you alter the system state.
    resolve ->(obj, args, ctx) {
      TimeLog.create(args.to_h)
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
      time_log.update_attributes(args.to_h.except('id'))
      time_log
    }
  end
end
