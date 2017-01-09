MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createProject, field: ProjectMutations::Create.field

  field :createTimeLog, field: TimeLogMutations::Create.field
  field :updateTimeLog, field: TimeLogMutations::Update.field
end
