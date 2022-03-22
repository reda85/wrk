import { gql } from "@apollo/client";
export const moveCandidateByPk = gql`
mutation updateCandidateByPk($id : uuid!, $jobId: uuid!, $event: String!, $type: String!, $stageId : Int!) {
    update_candidates_by_pk(pk_columns: {id: $id}, _set: {stageId: $stageId}) {
      stageId
      id
    }
    insert_events_one(object: {applicantId: $id, event: $event, jobId: $jobId, type: $type}){
        event
      }
  }
  `