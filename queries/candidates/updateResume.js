import { gql } from "@apollo/client";
export const updateResumeByPk = gql`
mutation updateResumeByPk($id : uuid!,  $resumeURL: String!) {
    update_candidates_by_pk(pk_columns: {id: $id}, _set: {resumeURL: $resumeURL}) {
        resumeURL
      id
    }
}
`