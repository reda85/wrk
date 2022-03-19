import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function JobTitleBanner(job) {
console.log('haaa job', job)
const router = useRouter()
const [title, setTitle] = useState(job.title)
useEffect(() => {
    if (job) {
        console.log('jooob', job)
        setTitle(job.job.title);
    }
    console.log('hmm', title)
  }, [job]);

    return(
      <div className="flex flex-row justify-between align-middle">
       <div className="h-16 p-4 flex flex-Row text-xl font-bold align-middle ">
            <div className="hover:bg-violet-50 cursor-pointer rounded-md p-1" onClick={() => router.push(`/jobs`)}><svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
</div>
        <div className="mx-2  text-black">{title}</div>
    </div>
    <div className="h-16 p-4 flex flex-Row text-xl font-bold align-middle ">
    <div className="hover:bg-violet-50 cursor-pointer rounded-md p-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
    </div>
    </div>
    </div>
      
    )
      }