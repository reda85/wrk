import { gql } from "@apollo/client";
export const findJobs = gql`
  query FindJobs($organization_id : Int!){
    
      
    jobs(where: {organization_id: {_eq: $organization_id}}) {
        description
        title
        category
        type
        id
      }
  }
`