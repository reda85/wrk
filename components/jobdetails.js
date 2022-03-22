import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { updateJobByPk } from "../queries/jobs/updateJob"

export default function JobDetails(props) {

    const {job} = props
    console.log('fing details', job)
    const router = useRouter()
    const {jobId} = router.query
const [title, setTitle] =  useState(job.title) 
const [category, setCategory] = useState(job.category) 
const [description, setDescription] =  useState(job.description) 
const [type, setType] =  useState(job.type) 
const [country, setCountry] =  useState(job.country) 
const [location, setLocation] = useState(job.location) 
const [updateJob, { data, loading, error }] = useMutation(updateJobByPk);

console.log('fing title', title)
    const submit = (e) => {
        e.preventDefault();
      
       console.log('fing title', title, category, type, jobId)
    
        updateJob({
          variables: {
          // description : description,
            title : title,
         category : category.category,
         type : type.type,
         id : jobId
          },
        })
          
      };
    
    return(
        <form onSubmit={submit}>
        <div className="flex p-4 flex-col w-1/2 shadow-inner h-screen ">
            
            <span className="text-2xl font-bold">Job details</span>
            <p className="text-gray-5OO"> Here is where you can edit the general information for this job. This includes things such as the job-type, hiring location, and if it is remote-friendly.</p>
            <span className="text-xl my-4 font-bold">Basic information</span>
            <div className="flex flex-row">
                <span className="text-xs font-bold">Title</span>
                <span className="text-xs ">(required)</span>
                
            </div>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={title}
            onChange={(e) =>
                setTitle({ title: e.currentTarget.value })}
                ></input>
            <span className="text-xs mt-4 font-bold">Category</span>
            <span className="text-xs ">You can add, remove, and edit job categories in account settings.</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={category}
             onChange={(e) =>
                setCategory({ category: e.currentTarget.value })}
                ></input>
            <span className="text-xs mt-4 font-bold">Employement type</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={type}
             onChange={(e) =>
                setType({ type: e.currentTarget.value })}
                ></input>
            <span className="text-xl mt-4 font-bold">Hiring location</span>
            <span className="text-xs mt-4 font-bold">Country</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={country}
             onChange={(e) =>
                setCountry({ country: e.currentTarget.value })}></input>
            <span className="text-xs mt-4 font-bold">Location</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={location}
             onChange={(e) =>
                setLocation({ title: e.currentTarget.value })}></input>
                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submit}
                  >
                    Create job
                  </button>
                </div>
               
            
        </div>
        </form>
    )
}