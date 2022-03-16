import { gql } from "@apollo/client";
export const findCandidates = gql`
  query FindCandidates($stageId : Int!){
    candidates(where: {stageId: {_eq: $stageId}}) {
        FirstName
        LastName
        Location
        Phone
        email
        id
        Country
      }
    }
    
`