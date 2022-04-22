import { gql } from "@apollo/client";
export const addstageByPk = gql`
mutation updatesatgeByPk( $name : String, $jobId : uuid, $organization_id : Int, $position1 : Int, $position2 : Int, $position : Int, $id_recrutement : Int!, $id_archive : Int!) {
    insert_stages_one(object: {position: $position2, name: $name, jobId: $jobId, organization_id: $organization_id}) {
        
        id
        name
        
        jobId
      }
      archive:update_stages_by_pk(pk_columns: {id: $id_archive}, _set: {position: $position}) {
        id
      }
      recrutement:update_stages_by_pk(pk_columns: {id: $id_recrutement}, _set: {position: $position1}) {
        id
      }
    }
  `