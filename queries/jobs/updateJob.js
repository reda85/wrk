import { gql } from "@apollo/client";

export const updateJobByPk = gql`
  mutation updatejob($category: String,$title: String,$type: String, $id : uuid!, $description :String, $country:String, $location:String, $application_location : String, $application_phone: String, $application_linkedin : String, $application_github: String) {
    update_jobs_by_pk(pk_columns: {id: $id} ,
        
        _set: {category: $category, title: $title, type: $type, description: $description, country: $country, location: $location,
            application_location : $application_location , application_phone : $application_phone,
            application_linkedin : $application_linkedin , application_github : $application_github
        }
    
   )
   {
       id
   }
  }
`;