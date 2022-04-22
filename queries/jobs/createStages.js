import { gql } from "@apollo/client";

export default gql`
  mutation CreateStages($jobId : uuid!) {
    reception:insert_stages_one(object: {name: "Réception", jobId: $jobId, position : 0}) {
     id 
    }
    screen:insert_stages_one(object: {name: "Screen", jobId: $jobId, position : 1}) {
     id  
      }
      interview:insert_stages_one(object: {name: "Entretien", jobId: $jobId, position : 2}) {
        id  
         }
         decide:insert_stages_one(object: {name: "Décision", jobId: $jobId, position : 3}) {
          id  
           }
           offre:insert_stages_one(object: {name: "Offre", jobId: $jobId, position : 4}) {
            id  
             }
     hire: insert_stages_one(object: {name: "Recrutement", jobId: $jobId, position : 5}) {
     id   
      }
      archive: insert_stages_one(object: {name: "Archive", jobId: $jobId, position : 6}) {
        id   
         }
  }
  
`;