

export default function CreateJobBanner() {

    return(
        <div className="h-16 p-4 flex flex-Row align-middle justify-between">
       <div className="flex flex-Row text-xl font-bold align-middle justify-start">  
       Your assigned jobs
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>
    </div>
    <button className="flex p-2 w-64 bg-gray-200 font-semibold align-center justify-middle rounded-md">Create new job</button>
    </div>
    )
      }