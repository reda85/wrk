//import DetailsSideBar from "../../../../components/detailsSideBar";
import CandidatesSideBar from "../../../../../../../components/candidatesSideBar";
import StagesSideBar from "../../../../../../../components/stagesSidebar";
import JobStatusBanner from "../../../../../../../components/jobStatusBanner";
import JobTitleBanner from "../../../../../../../components/jobTitleBanner";
import { findJobsbypk } from "../../../../../../../queries/jobs/getJobsbypk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import DetailsSideBar from "../../../../../../../components/detailsSideBar";
import { ResumeViewer } from "../../../../../../../components/resume";
//import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import dynamic from "next/dynamic";

const DocViewer = dynamic(import('react-doc-viewer'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})


export default function Resume() {
  const router = useRouter();
  const { jobId, applicantId } = router.query;
  const [job, setJob] = useState(null)
  const [ getJob, { data } ] = useLazyQuery(findJobsbypk)
  
  console.log("query resume", router.query)
 

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

      const docs = [
        { uri: "https://firebasestorage.googleapis.com/v0/b/kmx1-16598.appspot.com/o/blog%2FAIAIN%2BOUMAIMA.pdf"}
      ]
      if(job) {return (
        <div className=" display-block overflow-hidden">
            <JobStatusBanner job={job}/>
            <JobTitleBanner  job={job} />
          <div className="flex flex-row">
            <StagesSideBar  job={job} />
            <CandidatesSideBar  job={job}/>
            <DetailsSideBar job={job} type='resume' />
           
            </div>
            </div>
        );}
        else return 'loading ...'
      
}