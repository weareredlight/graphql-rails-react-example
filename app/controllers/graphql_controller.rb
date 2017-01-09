class GraphqlController < ApplicationController
  def create
    query_string = params[:query]
    query_variables = if params[:variables].present?
                        if params[:variables].is_a? String
                          JSON.parse(params[:variables])
                        else
                          params[:variables]
                        end
                      else
                        {}
                      end
    result = Schema.execute(query_string, variables: query_variables)
    render json: result
  end
end
