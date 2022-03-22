import { useLazyQuery } from "@apollo/client";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { findEvents } from "../queries/events/getEvents";

export default function OverviewWindow( props) {

    const [events, setEvents] = useState([])
    const [ getEvents, { data, loading } ] = useLazyQuery(findEvents)
    const {jobId, applicantId} = props

   console.log("applicantId", applicantId )
  
  useEffect(() => {
    if (jobId && applicantId) {
        console.log('jobId ', jobId)
        getEvents({
        variables: {
            jobId : jobId,
           
            applicantId : applicantId
        },
      })
    }
  }, [,jobId]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
            setEvents(data.events);
        }
      }, [data]);
      console.log('foooking events', events)

    return(
        <div className=" shadow-inner w-screen relative ">
          {!loading && <div>
            <div className="abolute h-16 text-violet-800 font-bold p-4 text-xl ">Overview</div>
   
        
        <div className="flex flex-grow flex-col mx-8 mt-6">
            {events.map(event => 
            <div key={event.id}>
            <div className="flex  flex-row items-center">
            <div className="p-1 mr-2 bg-white rounded-sm ">
            <ArrowCircleDownIcon className="h-4 w-4 text-gray-500  " />
            </div>
            <div className="text-xs">{event.event}</div>
            </div>
            <div className=" ml-2 w-2 h-4 bg-gray-100 ">
            </div>
        </div>)}
        </div>
        <div className="mx-2 p-2 flex flex-row rounded-md border-2 border-gray-200">
<button className="mx-4 p-2 font-semibold bg-gray-200 rounded-md"> Add a comment </button>
<button className="mx-4 p-2 font-semibold bg-gray-200 rounded-md"> Start a review </button>
        </div>
        </div>
}
{loading && <p>Loading ...</p>}
            
        </div>
    )
}