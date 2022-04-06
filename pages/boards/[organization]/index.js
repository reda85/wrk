
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { findJobs } from "../../../queries/jobs/getJobs";
import { findJobsByName } from "../../../queries/jobs/getJobsByName";




export default function Jobs() {

    const [jobs, setJobs] = useState([])
    const router = useRouter()
    const {organization} = router.query
  
    const { data, dataloading } = useQuery(findJobsByName, {
        variables: {
            organization : organization
        }})


  

  // Listen for changes on loading and authUser, redirect if needed


    useEffect(() => {
        if (data) {
            console.log('data', data)
            setJobs(data.jobs);
        }
      }, [data]);
    
  return (
  <div>
      
     
    <div className="flex flex-col items-center ">
       <div className="flex mt-4 flex-row w-3/4 justify-between">
           <h2 className="text-xl font-extrabold">{organization}</h2>
           <button className="bg-gray-200 px-3 py-2 rounded-md">Subscribe</button>
       </div>
       {dataloading && <p>Loading ...</p>}
       
      {jobs?.map(job => {
          return(
              <div key={job.id} className="flex p-4 m-2 flex-row w-3/4 justify-between rounded-md  border-gray-200 border cursor-pointer" onClick={() => router.push(`/boards/${organization}/${job.id}`)}>
              <div className=" flex flex-col " >
              <div className="text-xl font-semibold"> {job.title} </div>
              <div className="flex flex-row">
             
                {job.type && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.type}</div> }
                {job.category && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.category}</div> }
                {job.location && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.location}</div> }
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