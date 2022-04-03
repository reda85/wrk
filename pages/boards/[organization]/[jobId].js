//import DetailsSideBar from "../../../../components/detailsSideBar";


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

import JobAnnouncement from "../../../components/jobAnnouncement";
import { findJobsbypk } from "../../../queries/jobs/getJobsbypk";
import { ArrowLeftIcon } from "@heroicons/react/outline";
//import DetailsSideBar from "../../../../../../../components/detailsSideBar";



export default function Private() {
    const router = useRouter();
    const { jobId, organization } = router.query;
    const [job, setJob] = useState(null)
    const [ getJob, { data } ] = useLazyQuery(findJobsbypk)
    
    console.log("query overview", router.query)
   
  
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

  if(job) {return (
  <div className=" display-block flex flex-col justify-center items-center overflow-hidden">
    <div className="flex p-4 m-2 flex-row w-3/4 justify-between">
           <h2 className="text-xl font-extrabold">{organization}</h2>
           <button className="bg-gray-200 px-3 py-2 rounded-md">Subscribe</button>
       </div>
       <div className="flex p-4 m-2 font-extrabold flex-row w-3/4 " onClick={() => {router.push(`/boards/${organization}`)}}>
<ArrowLeftIcon className="h-4 w-4 font-extrabold" />
All jobs
       </div>
      <JobAnnouncement job={job} />
      </div>
  );}
  else return 'loading ...'
}