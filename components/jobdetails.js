export default function JobDetails() {

    return(
        <div className="flex p-4 flex-col w-1/2 border-r-2 border-t-2 h-screen ">
            <span className="text-2xl font-bold">Job details</span>
            <p className="text-gray-5OO"> Here is where you can edit the general information for this job. This includes things such as the job-type, hiring location, and if it is remote-friendly.</p>
            <span className="text-xl my-4 font-bold">Basic information</span>
            <div className="flex flex-row">
                <span className="text-xs font-bold">Title</span>
                <span className="text-xs ">(required)</span>
                
            </div>
            <input className="border-2 rounded-md border-gray-600"></input>
            <span className="text-xs mt-4 font-bold">Category</span>
            <span className="text-xs ">You can add, remove, and edit job categories in account settings.</span>
            <input className="border-2 rounded-md border-gray-600"></input>
            <span className="text-xs mt-4 font-bold">Employement type</span>
            <input className="border-2 rounded-md border-gray-600"></input>
            <span className="text-xl mt-4 font-bold">Hiring location</span>
            <span className="text-xs mt-4 font-bold">Country</span>
            <input className="border-2 rounded-md border-gray-600"></input>
            <span className="text-xs mt-4 font-bold">Location</span>
            <input className="border-2 rounded-md border-gray-600"></input>

        </div>
    )
}