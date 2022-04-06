import { gql } from "@apollo/client";
export const findJobsByName = gql`
  query FindJobsByName($organization : String!){
    
      
    jobs(where: {organization: {name: {_eq: $organization}}}) {
        description
        title
        category
        type
        id
      }
  }
`