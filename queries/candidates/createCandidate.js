import { gql } from "@apollo/client";

export const addCandidate = gql`
  mutation CreateCandidate($country: String, $firstName: String!, $lastName: String!, $location: String, $phone: String, $email: String, $stageId: Int!) {
    insert_candidates_one(object: {Country: $country, FirstName: $firstName, LastName: $lastName, Location: $location, Phone: $phone, email: $email, stageId: $stageId})

    {
        id
    }
   
  }
`;
