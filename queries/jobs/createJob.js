import { gql } from "@apollo/client";

export default gql`
  mutation CreateJob($job: jobs_insert_input!) {
    insert_jobs_one(object: $job) {
      
      title 
      id
    }
   
  }
`;
