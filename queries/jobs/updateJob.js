import { gql } from "@apollo/client";

export const updateJobByPk = gql`
  mutation updatejob($category: String,$title: String,$type: String, $id : uuid!, $description :String, $application_location : String, $application_phone: String) {
    update_jobs_by_pk(pk_columns: {id: $id} ,
        
        _set: {category: $category, title: $title, type: $type, description: $description,
            application_location : $application_location , application_phone : $application_phone}
    
   )
   {
       id
   }
  }
`;