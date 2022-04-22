import { gql } from "@apollo/client";
export const updatesatgeByPk = gql`
mutation updatesatgeByPk($id : Int!, $position : Int) {
    update_stages_by_pk(pk_columns: {id: $id}, _set: {position: $position}) {
        id
      }
    }
  `