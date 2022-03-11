import { useQuery } from "@apollo/client"
import { UserIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { findUsers } from "../queries/users/getUsers"



export default function detailsSideBar() {
    const [candidates, setUsers] = useState([])
    const { data, loading } = useQuery(findUsers)
    useEffect(() => {
        if (data) {
            console.log('data', data)
          setUsers(data.users);
        }
      }, [data]);
      
    return(
        <div className="flex flex-col p-2 flex-shrink w-60 border-2">
            <div className="flex flex-row p-3 justify-between">
                <span className="font-bold text-sm">Hired</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
            </div>
            {candidates.map(candidate => {
                return <div className=" group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md">
                    <div className="flex flex-row justify-start">
                   <div> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg> </div>
                   <div> {candidate.FirstName} </div> <span></span> <div> {candidate.LastName}</div>
                   </div>
                   <svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
                   </div>
            })}
        </div>
    )
} 