import { LoadingOutlined } from "@ant-design/icons/lib/icons"
import { useLazyQuery, useMutation } from "@apollo/client"
import { UserIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { findCandidateByPk } from "../queries/candidates/getCandidatebypk"
import { findCandidates } from "../queries/candidates/getCandidates"
import { updateCandidateByPk } from "../queries/candidates/updateCandidate"
import { findJobsbypk } from "../queries/jobs/getJobsbypk"


export default function DetailsSideBar(job) {

  console.log('jonb', job)
const router = useRouter()
const {jobId, id, applicantId} = router.query
const currentStageId = job.job.stages.findIndex(stage => stage.id == id )
console.log('currentStageId', currentStageId)
const nextStage = job.job.stages[currentStageId + 1]

const [mycandidate, setCandidate] = useState(null)
const [updateCandidate, ] = useMutation(updateCandidateByPk);

const [getCandidate, { data, loading, error }] = useLazyQuery(findCandidateByPk)
    useEffect(() => {
      if (applicantId) {
       
        getCandidate({
        variables: {
          id : applicantId
        },
      })
    }
      }, [applicantId]);

useEffect(() => {
  if (data) {
     
      setCandidate(data.candidates_by_pk);
      
  }
}, [data]);

const submit = (e) => {
  e.preventDefault();



  updateCandidate({
    variables: {
    id : applicantId, 
stageId : nextStage.id
    },
    refetchQueries: [
      {
        query: findJobsbypk,
        variables: {
          id : job.job.id
        },
        
          query: findCandidateByPk,
          variables: {
            id : applicantId
          },
          query: findCandidates,
          variables: {
            id : id
          },
      },
    ],
  }).then(router.push(`/jobs/${job.job.id}/stages/${id}/applicants`))
  
};
if(mycandidate ) {  return(
  <div className="flex flex-row">
        <div className="flex flex-col p-2 flex-shrink w-60 border-r-2 border-t-2">
          {loading && <LoadingOutlined className='h-10 w-10 text-violet-500' />}
           {!loading && 
           <div className="">
             
           <div className=" relative overflow-auto text-xl font-bold py-2 px-3">{mycandidate.FirstName + ' ' + mycandidate.LastName}</div>
            <div className="text-neutral-500 px-3 ">Manually added</div>
            <div className="group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md">
             <div className="flex flex-row justify-start">  
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
</svg>
Overview
</div> 
<svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>               
            </div>
            <div className="group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md" onClick={() => router.push(`/jobs/${jobId}/stages/${id}/applicants/${applicantId}/resume`)}>
            <div className="flex flex-row justify-start"> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>
Resume
</div>
<svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
</div>
<div className="group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md">
<div className="flex flex-row justify-start"> 
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
</svg>
Messages
</div>
<svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
</div>
<div className="group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md">
<div className="flex flex-row justify-start"> 
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
Files
</div>
<svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
</div>
<div className="group flex flex-row cursor-pointer justify-between hover:bg-violet-50 p-2 rounded-md">
<div className="flex flex-row justify-start"> 
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>
Private notes
</div>
<svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:stroke-black h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
</div>


<div className="font-bold pt-10 p-2"> Contact information</div>
<div className="flex flex-row  p-2">
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
</svg>
{mycandidate.Phone}
</div>

<div className="flex flex-row  p-2">
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
{mycandidate.email}
</div>

<div className="flex flex-row  p-2">
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
{mycandidate.location}
</div>
<button
type="button"
onClick={submit}
className="inline-flex justify-center m-4 px-4 py-2 w-40 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
> Move to {nextStage.name}</button>
</div>}
        </div>
        </div>
       
    )
  }
  else {return null}
} 