
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAuth } from '../context/AuthUserContext';
import { BellIcon } from "@heroicons/react/outline";
import SideBarNotifications from "../components/sidebarnotifications";
import Notifications from "../components/notifs";
import { findJobs } from "../queries/jobs/getJobs";
import { findNotifications,  } from "../queries/jobs/getNotifs";

export default function Mynotifications() {
    const [notifications, setNotifications] = useState(null)
   
    const [jobs, setJobs] = useState(null)
    const {user} = useAuth()
      const { data, dataloading } = useQuery(findJobs, {
          variables: {
              organization_id : user.organization_id
          }})

          
 
  
    const router = useRouter()

   


    useEffect(() => { 
        if (data) {
            
            console.log('datajob', data)
            setJobs(data.jobs);
            let nonnulljobs = data.jobs.filter(job => job.notifications.length > 0)
            setNotifications(nonnulljobs.map(job => job.notifications))
        }
        console.log('datajob', data)
      }, [data]);

      

      

    
  
  return (
  <div>
      
      <div className="flex flex-row justify-between align-middle">
       <div className="h-12 p-4 flex flex-Row text-xl font-bold items-center ">
            <div className="hover:bg-blue-50 cursor-pointer rounded-md p-1" ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>
        <div className="mx-2  text-black">Notifications hub</div>
    </div>
    </div>
    <div className="flex px-2 pt-6 flex-row shadow-inner">
        <div>
        <div className="w-64">
        <div className="flex font-bold flex-row p-4 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >
                    <div className="flex flex-row justify-start">
                        
<BellIcon className='mx-2 h-5 w-5' />
                       All notifications</div>
                       <div> {notifications?.length}</div>
                        </div>
                        </div>
    {jobs && notifications && <SideBarNotifications jobs={jobs} notifications={notifications}  /> }
        </div>
        <Notifications notifications={notifications} />
       
    </div>
   
      </div>
  );
}