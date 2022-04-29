import { useLazyQuery } from "@apollo/client";
import { ArrowCircleDownIcon, ArrowDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { findEvents } from "../queries/events/getEvents";
import Commentdiv from "./commentdiv";
import CreateCommentModal from "./CreateCommentModal";
import Reviewdiv from "./reviewdiv";

export default function OverviewWindow( props) {

  const {jobId, applicantId} = props
  const router = useRouter()
    const [events, setEvents] = useState([])
    const [ getEvents, { data, loading } ] = useLazyQuery(findEvents)
    

   console.log("applicantId overview fuck", applicantId )
  
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
  }, [applicantId,jobId]);

    useEffect(() => {
        if (data) {
            console.log('data', data)
            console.log('events', data.events)
            console.log('comments', data.comments)
           const x = data.events.concat(data.comments).concat(data.reviews)
            setEvents(x);

            
        }
      }, [data]);
      console.log('foooking events', events)

    return(
        <div className=" shadow-inner font-bold w-screen relative ">
          {!loading && 
            <div>
            <div className="abolute h-16 flex p-4 flex-row items-center align-middle">
            
            <div className="  font-extrabold  text-xl ">Overview</div>
   </div>
        
        <div className="flex flex-grow mt-6 flex-col ">
            {events.map((event, i) => 
            <div key={event.id} className="mx-8">
            {event.event && <div key={event.id}>
            <div className="flex  flex-row items-center">
            <div className="p-1 mr-2 border-2 border-gray-300 bg-white rounded-md ">
            <ArrowDownIcon className="h-4 w-4 text-gray-500  " />
            </div>
            <div className="text-xs">{event.event}</div>
            

            </div>
            <div className=" ml-2 w-2 h-4 bg-indigo-100 ">
            </div>
        </div>}
        {event.comment && 
        <div>
        <Commentdiv comment={event} />
        <div className=" ml-2 w-2 h-4 bg-indigo-100 " />
        </div>}
        {event.review && 
        <div>
        <Reviewdiv review={event} />
        <div className=" ml-2 w-2 h-4 bg-indigo-100 " />
        </div>}
        </div>)}
        
        
        </div>
        <div className="mx-2 p-2 flex flex-row rounded-md border-2 border-gray-300">
<button className="mx-4 p-2 font-semibold bg-indigo-200 rounded-md"> <CreateCommentModal jobId={jobId} applicantId={applicantId} /> </button>
<button 
className="mx-4 p-2 font-semibold bg-indigo-200 rounded-md"
onClick={() => {router.push(`/applicants/${applicantId}/${jobId}/reviews/new`)}}
> Start a review </button>
        </div>
        </div>
}
{loading && <p>Loading ...</p>}
            
        </div>
    )
}