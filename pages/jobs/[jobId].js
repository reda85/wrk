import DetailsSideBar from "../../components/detailsSideBar";
import CandidatesSideBar from "../../components/candidatesSideBar";
import StagesSideBar from "../../components/stagesSidebar";
import JobStatusBanner from "../../components/jobStatusBanner";
import JobTitleBanner from "../../components/jobTitleBanner";
import { findJobsbypk } from "../../queries/jobs/getJobsbypk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";


export default function Job() {
    const router = useRouter();
    const { jobId } = router.query;
    const [job, setJob] = useState([])
    const [ getJob, { data } ] = useLazyQuery(findJobsbypk)

   
  
  useEffect(() => {
    if (jobId) {
        console.log('jobId ', jobId)
      getJob({
        variables: {
            jobId : jobId
        },
        fetchPolicy: "network-only",
      })
    }
    
  }, [,jobId]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
           let receptionId = data.jobs_by_pk.stages.filter(stage => stage.name ==='Réception')[0].id
           console.log('receptionId', receptionId)
           router.push(`/jobs/${jobId}/stages/${receptionId}/applicants`)
        }
      }, [data]);

  return (
  <div>
  
      </div>
  );
}