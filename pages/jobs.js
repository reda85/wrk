
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateJobBanner from "../components/CreateJobBanner";
import { findJobs } from "../queries/jobs/getJobs";


export default function Jobs() {

    const [jobs, setJobs] = useState([])
    const router = useRouter()
    const { data, loading } = useQuery(findJobs)
    useEffect(() => {
        if (data) {
            console.log('data', data)
            setJobs(data.jobs);
        }
      }, [data]);
    
  return (
  <div>
      
      <CreateJobBanner />
    <div className="flex flex-col items-center ">
        <div className="w-3/4">You have {jobs.length} assignements</div>
      {jobs.map(job => {
          return(
              <div key={job.id} className="flex p-4 m-2 flex-row w-3/4 justify-between rounded-md  border-gray-200 border cursor-pointer" onClick={() => router.push(`/jobs/${job.id}`)}>
              <div className=" flex flex-col " >
              <div className="text-xl font-semibold"> {job.title} </div>
              <div className="flex flex-row">
              <div className="p-1 text-xs text-white m-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg border-gray-200 ">Not yet published</div>  
                {job.type && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.type}</div> }
                {job.description && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.description}</div> }
                 <div></div> 
              </div>
              </div>
              </div>
          )
      })}
      </div>
      </div>
  );
}