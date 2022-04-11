import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { updateJobByPk } from "../queries/jobs/updateJob"

export default function JobApplication(props) {

    const {job} = props
    console.log('fing details', job)
    const router = useRouter()
    const {jobId} = router.query
const [firstName, setFirstName] =  useState(job.application_firstname) 
const [lastName, setLastName] = useState(job.application_lastname) 
const [email, setEmail] =  useState(job.application_email) 
const [phone, setPhone] =  useState(job.application_phone) 

const [location, setLocation] = useState(job.application_location) 
const [updateJob, { data, loading, error }] = useMutation(updateJobByPk);

    const submit = (e) => {
        e.preventDefault();
      
       
    
        updateJob({
          variables: {
           description : job.description,
           title: job.title,
           category : job.category,
          application_location: location,
          application_phone: phone,
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
                <span className="text-xs text-gray-500 first-letter:font-bold">Firstname</span>
               
                
            </div>
     <input className="border-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>
     <div className="flex flex-row">
                <span className="text-xs text-gray-500 first-letter:font-bold">Lastname</span>
               
                
            </div>
     <input className="border-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>  
            <span className="text-xs mt-4 text-gray-500 font-bold">Email address</span>
           
            <input className="border-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>  
            <span className="text-xs mt-4 text-gray-500 font-bold">Phone</span>
            <select onChange={(e) => setPhone(e.currentTarget.value)} className="border-2 p-2 rounded-md border-gray-600">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
            <span className="text-xl mt-4 font-bold">Hiring location</span>
  
            <span className="text-xs mt-4 text-gray-500 font-bold">Location</span>
            <select onChange={(e) => setLocation(e.currentTarget.value)} className="border-2 p-2 rounded-md border-gray-600">
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
                    Save changes
                  </button>
                </div>
               
            
        </div>
        </form>
    )
}