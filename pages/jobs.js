
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateJobBanner from "../components/CreateJobBanner";
import { findJobs } from "../queries/jobs/getJobs";
import { useAuth } from '../context/AuthUserContext';
import { InboxIcon, UserIcon } from "@heroicons/react/outline";

export default function Jobs() {

    const [jobs, setJobs] = useState([])
  const {user} = useAuth()
    const { data, error, loading } = useQuery(findJobs, {
        variables: {
            organization_id : user.organization_id
        }})

    
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed

  const reducer = (accumulator, item) => {
    return accumulator + item.candidates_aggregate.aggregate.count;
  };

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
       { !loading &&  <div className="w-3/4">You have {jobs? jobs.length : 0} assignements</div> }
       {loading && <p>Loading ...</p>}
      {jobs.map(job => {
          return(
              <div key={job.id} className="flex p-4 m-2 flex-row w-3/4 justify-between rounded-md  border-gray-200 border cursor-pointer" onClick={() => router.push(`/jobs/${job.id}/setup/details`)}>
              <div className=" flex flex-col " >
              <div className="text-xl font-semibold"> {job.title} </div>
              <div className="flex flex-row">
              <div className="p-1 text-xs text-white m-1 bg-gradient-to-r from-indigo-500 to-green-500 rounded-lg border-gray-200 ">Not yet published</div>  
                {job.type && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.type}</div> }
                {job.category && <div className="p-1 text-xs m-1 border rounded-lg border-gray-200 text-gray-700">{job.category}</div> }
                 <div></div> 
              </div>
              </div>
              <div className="flex flex-col w-48">
                <div className=" flex my-3 flex-row font-light justify-between">
                  <div className="flex justify-start">
                <InboxIcon className="h-5 w-5" />
                Inbox
                </div>
                {job.stages[0].candidates.length}
                </div>
                <div className=" flex flex-row font-light justify-between">
                <div className="flex justify-start">
                <UserIcon className="h-5 w-5" />
                Total candidates
                </div>
                {job.stages.reduce(reducer, job.stages[0].candidates_aggregate.aggregate.count)}
                </div>
              </div>
              </div>
          )
      })}
      </div>
      </div>
  );
}