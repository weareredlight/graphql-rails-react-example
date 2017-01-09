DateTimeType = GraphQL::ScalarType.define do
  name 'DateTime'
  description 'Representation of a Ruby DateTime'

  coerce_input  ->(value) { DateTime.iso8601 value }
  coerce_result ->(value) { value.iso8601 }
end
