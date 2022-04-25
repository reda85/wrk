import { gql } from "@apollo/client";
export const updatesatgeByPk = gql`
mutation updatesatgeByPk($id : Int!, $position : Int) {
    update_stages_by_pk(pk_columns: {id: $id}, _set: {position: $position}) {
        id
      }
    }
  `
  export const updatesatgeNameByPk = gql`
  mutation updatesatgeNameByPk($id : Int!, $name : String) {
      update_stages_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
          id
        }
      }
    `
    export const deletesatgeNameByPk = gql`
    mutation deletesatgeNameByPk($id : Int!) {
      delete_stages_by_pk(id: $id) {
        id
      }
    }
      `