//import DetailsSideBar from "../../../../components/detailsSideBar";
import CandidatesSideBar from "../../../../../../components/candidatesSideBar";
import StagesSideBar from "../../../../../../components/stagesSidebar";
import JobStatusBanner from "../../../../../../components/jobStatusBanner";
import JobTitleBanner from "../../../../../../components/jobTitleBanner";
import { findJobsbypk } from "../../../../../../queries/jobs/getJobsbypk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import DetailsSideBar from "../../../../../../components/detailsSideBar";
import OverviewWindow from "../../../../../../components/overview";



export default function Stage() {
    const router = useRouter();
    const { jobId, id } = router.query;
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
            console.log('data applicants index', data)
            setJob(data.jobs_by_pk);
            let stage1 = data.jobs_by_pk.stages.filter(stage => stage.id == id)[0]
           console.log('stage1',stage1)
          
          }
      }, [data,id]);
      console.log('foooking job', job)

  return (
    <div>
  {job && <div>
      <JobStatusBanner job={job}/>
      <JobTitleBanner  job={job} />
    <div className="flex flex-row">
      <StagesSideBar  job={job} />
      <CandidatesSideBar  job={job}/>
     
      </div>
      </div>}
      </div>
  );
}