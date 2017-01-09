class GraphqlController < ApplicationController
  def create
    query_string = params[:query]
    query_variables = params[:variables].present? ? JSON.parse(params[:variables]) : {}
    result = Schema.execute(query_string, variables: query_variables)
    render json: result
  end
end
