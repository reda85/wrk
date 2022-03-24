import { gql } from "@apollo/client";

export default gql`
  mutation CreateComment($comment: comments_insert_input!) {
    insert_comments_one(object: $comment) {
      
      
      id
    }
   
  }
`;