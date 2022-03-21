import { gql } from "@apollo/client";

export const updateJobByPk = gql`
  mutation updatejob($category: String,$title: String,$type: String, $id : uuid!, $description :String) {
    update_jobs_by_pk(pk_columns: {id: $id} ,
        
        _set: {category: $category, title: $title, type: $type, description: $description}
    
   )
   {
       id
   }
  }
`;