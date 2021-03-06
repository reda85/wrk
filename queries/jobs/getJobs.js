import { gql } from "@apollo/client";
export const findJobs = gql`
  query FindJobs($organization_id : Int!){
    
      
    jobs(where: {organization_id: {_eq: $organization_id}}) {
        description
        title
        category
        type
        id
        stages {
          candidates {
              FullName
          }
          candidates_aggregate {
            aggregate {
              count
            }
          }
        }
        notifications {
          body
          id
          jobId
          read
          organization_id
          type
          candidate {
              FullName
          }
        }
      }
  }
`