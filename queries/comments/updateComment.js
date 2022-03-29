import { gql } from "@apollo/client";
export const updateComment = gql`
mutation updateCommentByPk($id : Int!,  $comment: String!) {
    update_comments_by_pk(pk_columns: {id: $id}, _set: {comment: $comment}) {
     
      id
    }
    
  }
  `