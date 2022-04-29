
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAuth } from '../../context/AuthUserContext';

import SideBarAccount from "../../components/sideBarAccount";
import UserProfile from "../../components/userprofile";

export default function Mynotifications() {
    const [notifications, setNotifications] = useState(null)
   
    const [jobs, setJobs] = useState(null)
    const {user} = useAuth()
   

          
 
  
    const router = useRouter()

   



      

      

    
  
  return (
  <div>
      
      <div className="flex flex-row justify-between align-middle">
       <div className="h-12 p-4 flex flex-Row text-xl font-bold items-center ">
            <div className="hover:bg-indigo-50 cursor-pointer rounded-md p-1" ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>
        <div className="mx-2  text-black">Account settings</div>
    </div>
    </div>
    <div className="flex px-2  flex-row shadow-inner">
        <div>
       
     <SideBarAccount setup='profile' /> 
        </div>
        
       <UserProfile />
    </div>
   
      </div>
  );
}