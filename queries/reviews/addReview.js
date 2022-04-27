import { gql } from "@apollo/client";

export const addReview = gql`
  mutation addReview($review: String, $evaluation: String!, $organization_id: Int!, $jobId: uuid, $candidateId: uuid) {
    insert_reviews_one(object: {review: $review, evaluation: $evaluation, organization_id: $organization_id, jobId: $jobId, candidateId: $candidateId})

    {
        id
    }
   
  }
`;