import { gql } from "@apollo/client";
export const findNotifications = gql`
  query FindNotifications($organization_id : Int!){
    notifications(where: {organization_id: {_eq: $organization_id}}) {
        body
        id
        jobId
        organization_id
        type
        candidate {
            FullName
        }
      }
    
  }
`