import { gql } from "@apollo/client";

export default gql`
  mutation CreateStages($jobId : uuid!) {
    reception:insert_stages_one(object: {name: "Réception", jobId: $jobId}) {
     id 
    }
    screen:insert_stages_one(object: {name: "Screen", jobId: $jobId}) {
     id  
      }
      interview:insert_stages_one(object: {name: "Entretien", jobId: $jobId}) {
        id  
         }
         decide:insert_stages_one(object: {name: "Décision", jobId: $jobId}) {
          id  
           }
           offre:insert_stages_one(object: {name: "Offre", jobId: $jobId}) {
            id  
             }
     hire: insert_stages_one(object: {name: "Recrutement", jobId: $jobId}) {
     id   
      }
  }
  
`;