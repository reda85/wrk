import { gql } from "@apollo/client";
export const findUsers = gql`
  query FindUsers{
    users {
      FirstName
      LastName
      email
      id
      organization_id
    }
  }
`