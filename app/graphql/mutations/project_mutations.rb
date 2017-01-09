module ProjectMutations
  Create = GraphQL::Relay::Mutation.define do
    name 'CreateProject'

    # Accessible from `input` in the resolve function:
    input_field :name, !types.String
    #...

    return_type ProjectType

    # The resolve proc is where you alter the system state.
    resolve ->(obj, args, ctx) {
      Project.create(args.to_h)
    }
  end
end
