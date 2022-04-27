import { LoadingOutlined } from "@ant-design/icons/lib/icons"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { updateJobByPk } from "../queries/jobs/updateJob"
import {toast} from 'react-hot-toast'

export default function JobApplication(props) {

    const {job} = props
    console.log('fing details', job)
    const router = useRouter()
    const {jobId} = router.query
const [firstName, setFirstName] =  useState(job.application_firstname) 
const [lastName, setLastName] = useState(job.application_lastname) 
const [email, setEmail] =  useState(job.application_email) 
const [phone, setPhone] =  useState(job.application_phone) 
const [linkedin, setLinkedin] =  useState(job.application_linkedin) 
const [github, setGithub] =  useState(job.application_github) 
const [resume, setResume] =  useState(job.application_resume) 

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
          application_linkedin: linkedin,
          application_github: github,
          application_resume: resume,
         id : jobId
          },
        })
        .then( data => toast.success('Job has been updated succesfully'))
        .catch(error => toast.error(error))
      };
    
    return(
        <form onSubmit={submit}>
        <div className="flex p-4 flex-col w-3/4 shadow-inner  ">
            
            <span className="text-2xl font-extrabold">Application form</span>
            <p className="font-bold text-gray-500 "> Here is where you can edit which fields appear on this job application form and if they are required or not. You can further customize the application form by adding additional questions.</p>
            <span className="text-xl my-4 font-bold">Basic information</span>
            <div className="flex flex-row">
                <span className="text-xs mt-4 text-gray-500 font-bold">Firstname</span>
               
                
            </div>
     <input className="border-2 mt-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>
     <div className="flex flex-row">
                <span className="text-xs mt-4 text-gray-500 font-bold">Lastname</span>
               
                
            </div>
     <input className="border-2 mt-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>  
            <span className="text-xs mt-4 text-gray-500 font-bold">Email address</span>
           
            <input className="border-2 mt-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Always required" disabled/>  
            <span className="text-xs mt-4 text-gray-500 font-bold">Phone</span>
            <select defaultValue={phone} onChange={(e) => setPhone(e.currentTarget.value)} className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
            <span className="text-xl mt-4 font-bold">Hiring location</span>
  
            <span className="text-xs mt-4 text-gray-500 font-bold">Location</span>
            <select defaultValue={location} onChange={(e) => setLocation(e.currentTarget.value)} className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>

      <span className="text-xl mt-4 font-bold">Links</span>
  
            <span className="text-xs mt-4 text-gray-500 font-bold">LinkedIn</span>
            <select defaultValue={linkedin} onChange={(e) => setLinkedin(e.currentTarget.value)} className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>

     
  
            <span className="text-xs mt-4 text-gray-500 font-bold">Github</span>
            <select defaultValue={github} onChange={(e) => setGithub(e.currentTarget.value)} className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
      <span className="text-xl mt-4 font-bold">Resume</span>
                <span className="text-xs mt-4 text-gray-500 font-bold">Resume</span>
            <select defaultValue={resume} onChange={(e) => setResume(e.currentTarget.value)} className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
      <option>Required</option>
      <option>Hidden</option>
          <option>Optional</option>
      </select>
                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={submit}
                  >
                    {loading ? <LoadingOutlined /> : <span>Save changes</span>}
                  </button>
                </div>

               
            
        </div>
        </form>
    )
}