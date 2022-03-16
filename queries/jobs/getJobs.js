import { gql } from "@apollo/client";
export const findJobs = gql`
  query FindJobs{
    jobs {
        description
        title
        category
        type
        id
      }
  }
`