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
            setNotifs(notifications);
        }
        
      }, [notifications]);


    return(
        <div className="mt-3 mx-8 w-full">
        <p className="text-xl font-bold">All notifications</p>
        {notifs && notifs.map((notif, index) => {console.log('nnn',notif[0]);
        return(
            <div key={index} className="flex flex-row justify-between border-2 p-2 rounded-md">
 <div className="flex flex-row justify-start">
<UserIcon className="h-5 w-5" />
<div className="flex flex-col">
    <div>
{notif[0]?.candidate.FullName}
</div>
<div>
<p className="text-xs text-gray-500">{notif[0]?.body}</p>
</div>
</div>
</div>
            </div>

        )})}
     </div>
    )
}