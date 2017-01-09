import gql from 'graphql-tag';


const timeLogWithProject = `
  id,
  name,
  started_at,
  stopped_at,
  project {
    id,
    name
  }
`;


export const fetchTimeLogs = gql`
  query fetchTimeLogs {
    time_logs {
      ${timeLogWithProject}
    }
  }
`;


export const fetchRunningTimeLog = gql`
  query fetchRunningTimeLog {
    time_log(running: true) {
      ${timeLogWithProject}
    }
  }
`;


export const createTimeLog = gql`
  mutation createTimeLog($params: CreateTimeLogInput!) {
    createTimeLog (input: $params) {
      ${timeLogWithProject}
    }
  }
`;

export const updateTimeLog = gql`
  mutation updateTimeLog($params: UpdateTimeLogInput!) {
    updateTimeLog (input: $params) {
      ${timeLogWithProject}
    }
  }
`;
