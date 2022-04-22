import { LoadingOutlined } from "@ant-design/icons/lib/icons"
import { useLazyQuery, useQuery } from "@apollo/client"
import { UserIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { findCandidates } from "../queries/candidates/getCandidates"
import { findUsers } from "../queries/users/getUsers"
import DetailsSideBar from "./detailsSideBar"
import NoCandidates from "./nocandidates"



export default function CandidatesSideBar( job) {
  const router = useRouter()
  const {id, applicantId} = router.query;
  console.log("query", router.query)
    const [mycandidates, setCandidates] = useState(null)
    const [stages, setStages] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [getCandidates,{ data, loading }] = useLazyQuery(findCandidates)
    useEffect(() => {
      if (id) {
        console.log('stageId candidates', id)
        getCandidates({
        variables: {
          stageId : id
        },
        
    fetchPolicy: "network-only",
      })
    }
      }, [id]);

      useEffect(() => { 
        if (job) {
            
           
            setStages(job.job.stages);
            
            
        }
      //  console.log("job candidates", stages.filter(stage => stage.id == id)[0].name)
     
      }, [job]);

      useEffect(() => {
        if (data) {
           
            setCandidates(data.candidates);
        }
      }, [data]);   
      
      const selectCandidate = (s) => {
       
        setSelectedCandidate(s)
        router.push(`/jobs/${job.job.id}/stages/${id}/applicants/${s.id}/overview`)
        return
    }
       
    
     
    return(
        <div className="flex  flex-row ">
        <div className="flex flex-col p-2 flex-shrink w-60 shadow-inner divide-x-2 divide-y-2">
        {loading && <LoadingOutlined className='h-5 w-5 text-blue-700' />}
         {!loading && <div>   <div className="flex flex-row p-3  justify-between">
            {stages && stages.length > 0 && <span className="text-blue-700 font-extrabold text-lg ">{stages.filter(stage => stage.id == id)[0].name}</span> } 
            
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
            </div>
            {mycandidates && mycandidates.length == 0 && <NoCandidates />}
            {mycandidates && mycandidates.length >0 && mycandidates.map(candidate => {
              
              console.log('ghghgh')
              if((applicantId !== candidate.id)) { return <div className=" font-bold text-gray-500 group flex flex-row cursor-pointer items-center justify-between hover:bg-blue-50 p-2 rounded-md" onClick={() => selectCandidate(candidate)}>
                    <div className="flex flex-row items-center justify-start">
                   <div> <UserIcon className="w-5 h-5 mr-2 text-gray-500" /> </div>
                   <div> {candidate.FirstName} </div> <span>&nbsp;</span> <div> {candidate.LastName}</div>
                   </div>
                   <svg xmlns="http://www.w3.org/2000/svg" className="text-white font-bold group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
                   </div>}
               else {
                if((applicantId === candidate.id)) {  return <div className=" items-center font-bold group flex flex-row cursor-pointer  justify-between bg-blue-700 text-white p-2 rounded-md" onClick={() => selectCandidate(candidate)}>
                <div className="flex  items-end flex-row justify-start">
               <div> <UserIcon className="w-5 h-5 mr-2 text-white" /> </div>
               <div> {candidate.FirstName} </div> <span>&nbsp;</span> <div> {candidate.LastName}</div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" className="  h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
               </div>}  
                
                else{ return <div className=" group flex flex-row cursor-pointer items-center justify-between hover:bg-blue-50 p-2 rounded-md" onClick={() => selectCandidate(candidate)}>
                <div className="flex items-center flex-row justify-start">
               <div> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg> </div>
               <div> {candidate.FirstName} </div> <span>&nbsp;</span> <div> {candidate.LastName}</div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
               </div>}
               }
            })}
        </div>
        }
        </div>
        


        </div>
    )
} 