import { UserIcon } from "@heroicons/react/outline"
import { useEffect } from "react"
import { useState } from "react"

export default function Notifications(props) {
    const {notifications} = props
    const [notifs, setNotifs] = useState(notifications)
    console.log('notifications', notifications)


    useEffect(() => { 
        if (notifications) {
            
            console.log('mynotifications', notifications)
            setNotifs(...notifications);
        }
        
      }, [notifications]);


    return(
        <div className="mt-3 mx-8 w-full">
        <p className="text-xl font-bold">All notifications</p>
        {notifs && notifs.map((notif, index) => {console.log('nnn',notifs);
        return(
            <div key={index} className="flex flex-row justify-between items-center border-2 p-2 rounded-md">
 <div className="flex flex-row justify-start">
     {notif.read == 'yes'? <span className="h-4 w-4 text-gray-400">&#x25cf;</span> :
     <span className="h-4 w-4 text-red-400">&#x25cf;</span>}
<UserIcon className="h-5 w-5 mx-2" />
<div className="flex flex-col">
    <div>
{notif?.candidate.FullName}
</div>
<div>
<p className="text-xs text-gray-500">{notif?.body}</p>
</div>
</div>
</div>
<div>

{notif?.read == 'no' ? <button
          type="button"
          
          className="px-4 py-2 my-2 mx-2 text-sm font-medium text-black bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Mark as read
        </button> :
        <button
        type="button"
        
        className="px-4 py-2 my-2 mx-2 text-sm font-medium text-black bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Mark as unread
      </button>
        
        }
        <button
          type="button"
          
          className="px-4 py-2 my-2 text-sm font-medium text-red-400 bg-white border-red-400 border-2 hover:bg-red-400 hover:text-white rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Dismiss
        </button> 
            </div>
            </div>

        )})}
     </div>
    )
}