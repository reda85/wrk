import { gql } from "@apollo/client";
export const search = gql`
  query search($query: String) {
    candidates(where: {FullName: {_ilike: $query}}) {
      FirstName
      LastName
      FullName
      stage {
        id
        job {
          title
        }
      }
    }
  }
    
`