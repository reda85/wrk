import JobStatusBanner from "../../../../components/jobStatusBanner";
import JobTitleBanner from "../../../../components/jobTitleBanner";
import { findJobsbypk } from "../../../../queries/jobs/getJobsbypk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
//import DetailsSideBar from "../../../../../../../components/detailsSideBar";
import JobSetup from "../../../../components/jobSetup";
import StagesSideBar from "../../../../components/stagesSidebar";
import JobDetails from "../../../../components/jobdetails";
//import DetailsSideBar from "../../../../../../../components/detailsSideBar";



export default function Overview() {
    const router = useRouter();
    const { jobId, id, applicantId } = router.query;
    const [job, setJob] = useState([])
    const [ getJob, { data } ] = useLazyQuery(findJobsbypk)

   
  
  useEffect(() => {
    if (jobId) {
        console.log('jobId ', jobId)
      getJob({
        variables: {
            jobId : jobId
        },
      })
    }
  }, [,jobId]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
            setJob(data.jobs_by_pk);
        }
      }, [data]);
      console.log('foooking job', job)

  return (
  <div>
      <JobStatusBanner job={job}/>
      <JobTitleBanner  job={job} />
    <div className="flex flex-row">
      <StagesSideBar  job={job} />
     <JobSetup />
    <JobDetails />
      </div>
      </div>
  );
}