import { gql } from "@apollo/client";
export const findCandidateByPk = gql`
  query FindCandidateByPk($id : uuid!){
    candidates_by_pk(id: $id) {
    Country
    FirstName
    LastName
    Location
    Phone
    email
    id
    resumeURL
  }
}
    
`