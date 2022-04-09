import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { updateJobByPk } from "../queries/jobs/updateJob"

export default function JobApplication(props) {

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
        <div className="flex p-4 flex-col w-3/4 shadow-inner  ">
            
            <span className="text-2xl font-extrabold">Application form</span>
            <p className="font-bold text-gray-500 "> Here is where you can edit which fields appear on this job application form and if they are required or not. You can further customize the application form by adding additional questions.</p>
            <span className="text-xl my-4 font-bold">Basic information</span>
            <div className="flex flex-row">
                <span className="text-xs text-gray-500 first-letter:font-bold">Name</span>
               
                
            </div>
     <input className="border-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/> 
            <span className="text-xs mt-4 text-gray-500 font-bold">Email address</span>
           
            <input className="border-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>  
            <span className="text-xs mt-4 text-gray-500 font-bold">Phone</span>
            <select className="border-2 p-2 rounded-md border-gray-600">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
            <span className="text-xl mt-4 font-bold">Hiring location</span>
            <span className="text-xs mt-4 text-gray-500 font-bold">Country</span>
            <select className="border-2 p-2 rounded-md border-gray-600">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
            <span className="text-xs mt-4 text-gray-500 font-bold">Location</span>
            <select className="border-2 p-2 rounded-md border-gray-600">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
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