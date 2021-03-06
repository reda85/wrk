
import { gql } from "@apollo/client";
export const findEvents = gql`
  query FindEvents($applicantId : uuid!, $jobId : uuid!){
    events(where: {applicantId: {_eq: $applicantId}, jobId: {_eq: $jobId}}) {
        applicantId
        event
        event_time
        id
        jobId
        type
      }
      comments(where: {applicantId: {_eq: $applicantId}, jobId: {_eq: $jobId}}) {
        applicantId
        comment
        id
        jobId
      }
      reviews(where: {candidateId: {_eq: $applicantId}, jobId: {_eq: $jobId}}) {
        evaluation
        id
        review
      }
      
    }
`