import { gql } from "@apollo/client";
export const findJobsbypk = gql`
  query FindJobs($jobId : uuid!){
jobs_by_pk(id: $jobId) {
    category
    description
    id
    organization_id
    stages {
      id
      jobId
      name
      candidates {
        FirstName
        LastName
        id
      }
    }
    title
    type
    userId
    application_email
    application_firstname
    application_github
    application_lastname
    application_linkedin
    application_location
    application_phone
    application_resume
    application_website
  }
}
`