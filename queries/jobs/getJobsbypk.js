import { gql } from "@apollo/client";
export const findJobsbypk = gql`
  query FindJobs($jobId : uuid!){
jobs_by_pk(id: $jobId) {
    category
    description
    id
    organization_id
    stages {
      id
      jobId
      name
      candidates {
        FirstName
        LastName
        id
      }
    }
    title
    type
    userId
  }
}
`