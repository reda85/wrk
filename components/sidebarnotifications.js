import { ClipboardCheckIcon, CogIcon, PencilAltIcon, ChatIcon, UserIcon, BriefcaseIcon  } from "@heroicons/react/outline";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";





export default function SideBarNotifications(props) {
   const {jobs, notifications} = props
    const [notifs, setNotifs] = useState(notifications)
    const [myjobs, setJobs] = useState(jobs)
    
    

useEffect(() => { 
    if (jobs) {
        
        console.log('jobs', jobs)
        setJobs(jobs);
    }
    console.log('myjobs', myjobs)
  }, [jobs]);

  useEffect(() => { 
    if (notifications) {
        
        console.log('mynotifications', notifications)
        setNotifs(...notifications);
    }
    
  }, [notifications]);

 
    return(
        
        <div className="flex flex-row">
       {myjobs.length > 0 && notifs.length > 0 && <div className="flex flex-col font-extrabold flex-shrink w-64 p-2  ">
          <p className="font-extrabold mt-6 p-2 text-gray-500 ">Types</p>



          <button className="flex font-bold flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row justify-start">
                        
<UserIcon className='mx-2 h-5 w-5' />
                        New candidates</div>
                        {notifs?.filter(notif => notif.type === 'new_candidate').length}</button>

                        <button className="flex font-bold flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row justify-start">
                        
<ChatIcon className='mx-2 h-5 w-5' />
                        New Meesages</div>
                        {notifs?.filter(notif => notif?.type == 'new_message').length}</button>

                        <button className="flex font-bold flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row justify-start">
                        
<PencilAltIcon className='mx-2 h-5 w-5' />
                        New Activity</div>
                        {notifs?.filter(notif => notif?.type == 'new_activity').length}</button>

                        <p className="font-extrabold mt-6 p-2 text-gray-500 ">Jobs</p>
            { myjobs.map((myjob, index) => {
                return(
                    <div key={index}>
                   <button className="flex font-bold flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => selectStage(stage, job)}>
                   <div  className="flex flex-row justify-start">
                       
<BriefcaseIcon className='mx-2 h-5 w-5' />
                       {myjob.title}</div>
                       {myjob.notifications?.length}
                       </button>
                       </div>)
            })}

        </div>
}

        </div>
    )
} 