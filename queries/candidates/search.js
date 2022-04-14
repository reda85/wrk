import { gql } from "@apollo/client";
export const search = gql`
  query search($query: String, $query1S: String, $query2: String) {
    candidates(where: {LastName: {_ilike: $query}, _or: {LastName: {_ilike: $query1}, _or: {FirstName: {_ilike: $query}, _or: {FirstName: {_like: $query1}, _or: {FirstName: {_ilike: $query2}}}}}}) {
      FirstName
      LastName
      stage {
        id
        job {
          title
        }
      }
    }
  }
    
`