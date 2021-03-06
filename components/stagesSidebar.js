import { ArchiveIcon, ClipboardCheckIcon, CogIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import JobSetup from "./jobSetup";



export default function StagesSideBar(job) {
    const router = useRouter();
    const {id} = router.query;
    const [stages, setStages] = useState(null)
    
    const [selectedStage, setSelecteStage] = useState(null)

    console.log('jooobzzzzz1', job)

useEffect(() => { 
    if (job) {
        console.log('jooobzzzzz', job)
       
        setStages(job.job.stages);
    }
  console.log('stages', stages)
  }, [job]);

  const selectStage = (s, job) => {
      console.log('heeere')
      router.push(`/jobs/${job.job.id}/stages/${s.id}/applicants`)
      return
  }
    return(
        <div className="flex flex-row">
        <div className="flex flex-col font-extrabold flex-shrink w-56 px-4 py-2 shadow-inner  ">
          <p className="font-extrabold text-gray-500 p-2 text-lg ">Stages ({stages?.length})</p>
        
            {stages && stages.map(stage => {
               if( (id != stage.id)) { return <button className="flex font-medium flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md items-center" onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row justify-start">
                        {stage.name == "Réception" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
</svg> }
{stage.name == "Recrutement" && <ClipboardCheckIcon className="h-6 w-6 mr-2"/>}
{stage.name == "Archive" && <ArchiveIcon className="h-6 w-6 mr-2"/>}
{stage.name != "Recrutement" && stage.name != "Réception"&& stage.name != "Archive"  && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
</svg>}
                        {stage.name.length > 15? stage.name.substr(0, 14) + '...' : stage.name}</div>
                        {stage.candidates.length}</button>}
                else {
                    if((id == stage.id)) {return <div className="flex flex-row p-2 justify-between items-center bg-indigo-500 text-white cursor-pointer rounded-md items-center" onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row items-center justify-start">
                    {stage.name == "Réception" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
</svg> }
{stage.name == "Recrutement" && <ClipboardCheckIcon className="h-6 w-6 mr-2"/>}
{stage.name == "Archive" && <ArchiveIcon className="h-6 w-6 mr-2"/>}
{stage.name != "Recrutement" && stage.name != "Réception" && stage.name != "Archive" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
</svg>}
{stage.name.length > 15? stage.name.substr(0, 14) + '...' : stage.name}</div>
                        {stage.candidates.length}</div>
                }
                else{
                    return <div className="flex flex-row p-2 justify-between items-center self-center cursor-pointer rounded-md " onClick={() => selectStage(stage, job)}>
                    <div className="flex flex-row items-center justify-start">
                    {stage.name == "Réception" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
</svg> }
{stage.name == "Recrutement" && <ClipboardCheckIcon className="h-6 w-6 mr-2"/>}
{stage.name == "Archive" && <ArchiveIcon className="h-6 w-6 mr-2"/>}
{stage.name != "Recrutement" && stage.name != "Réception" && stage.name != "Archive" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
</svg>}
                        {stage.name.length > 15? stage.name.substr(0, 14) + '...' : stage.name}</div>
                        {stage.candidates.length}</div> 
                }
            }
            })}
            {job.setup ? <div className="flex mt-8 p-2 mr-2  flex-row justify-start bg-indigo-500 text-white cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.job.id}/setup/details`)}>
                <CogIcon className="stroke-white h-6 w-6 mr-2" />
                Job setup
                </div> :                 <div className="flex p-2 mt-8  mr-2 flex-row justify-start cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.job.id}/setup/details`)}>
                <CogIcon className="h-6 w-6 mr-2" />
                Job setup
                </div> }
        </div>
       
        </div>
    )
} 