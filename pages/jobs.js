
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateJobBanner from "../components/CreateJobBanner";
import { findJobs } from "../queries/jobs/getJobs";
import { useAuth } from '../context/AuthUserContext';

export default function Jobs() {

    const [jobs, setJobs] = useState([])
  const {user} = useAuth()
    const { data, dataloading } = useQuery(findJobs, {
        variables: {
            organization_id : user.organization_id
        }})

    
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed


    useEffect(() => {
        if (data) {
            console.log('data', data)
            setJobs(data.jobs);
        }
      }, [data]);
    
  return (
  <div>
      
      <CreateJobBanner />
    <div className="flex flex-col font-bold items-center ">
       {jobs && !dataloading &&  <div className="w-3/4">You have {jobs.length} assignements</div> }
       {dataloading && <p>Loading ...</p>}
      {jobs.map(job => {
          return(
              <div key={job.id} className="flex p-4 m-2 flex-row w-3/4 justify-between rounded-md  border-gray-200 border cursor-pointer" onClick={() => router.push(`/jobs/${job.id}/setup/details`)}>
              <div className=" flex flex-col " >
              <div className="text-xl font-semibold"> {job.title} </div>
              <div className="flex flex-row">
              <div className="p-1 text-xs text-white m-1 bg-gradient-to-r from-blue-700 to-fuchsia-500 rounded-lg border-gray-200 ">Not yet published</div>  
                {job.type && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.type}</div> }
                {job.category && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.category}</div> }
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