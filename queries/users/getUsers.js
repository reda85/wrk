import { gql } from "@apollo/client";
export const findUserByUid = gql`
  query findUserByUid($uid : String!){
    users(where: {uid: {_eq: $uid}}) {
      FirstName
      LastName
      email
      id
      organization_id
      uid
      organization {
        name
      }
    }
  
}
    
`