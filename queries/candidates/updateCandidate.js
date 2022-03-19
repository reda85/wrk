import { gql } from "@apollo/client";
export const updateCandidateByPk = gql`
mutation updateCandidateByPk($id : uuid!, $stageId : Int!) {
    update_candidates_by_pk(pk_columns: {id: $id}, _set: {stageId: $stageId}) {
      stageId
      id
    }
  }
  `