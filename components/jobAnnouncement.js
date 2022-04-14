import { useState } from "react"
import parse from 'html-react-parser';
import { useMutation } from "@apollo/client";
import { addCandidate } from "../queries/candidates/createCandidate";

export default function JobAnnouncement(props) {
    const {job} = props
    const [firstName, setFirstName] = useState(null)
const [lastName, setLastName] = useState(null)
const [email, setEmail] = useState(null)
const [phone, setPhone] = useState(null)
const [location, setLocation] = useState(null)
const [linkedin, setLinkedin] = useState(null)
const [github, setGithub] = useState(null)
const [resume, setResume] = useState(null)
const [insertCandidate, { data, loading, error }] = useMutation(addCandidate);

const submit = (e) => {
    e.preventDefault();
  
    console.log('fiiiiiirst',firstName.firstName)

    insertCandidate({
     
      variables: {
       
        firstName: firstName.firstName,
        lastName: lastName.lastName,
        email: email.email,
        phone: phone?.phone,
        location: location?.location,
        stageId : job.stages[0].id
      },
    })
      
  };

    return(
        <div className="flex flex-col mt-6 w-3/4 justify-center">
            <h1 className="font-black text-blue-700 text-4xl">{job.title}</h1>
           
{job.description && <article className="prose-sm ">{parse(job.description)}</article>}
          

<form onSubmit={submit}>
                <div className='flex w-3/4 p-3 flex-col bg-gray-100 rounded-md'>
                <span className="text-xl my-4 font-bold">Apply here</span>
                {(job.application_firstname == 'Required' || job.application_firstname == 'Optional') && 
           <div className="flex flex-col">
               <div className="flex flex-row">
                <span className="text-xs font-bold">First Name</span>
                <span className="text-xs ">(required)</span>
                
            </div>
            
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={firstName}
            onChange={(e) =>
              setFirstName({ firstName: e.currentTarget.value })
            }
            
                ></input>
                </div>}
                {(job.application_lastname == 'Required' || job.application_lastname == 'Optional') && 
            <div className="flex flex-col">
                  <div className="flex mt-4 flex-row">
                <span className="text-xs font-bold">Last Name</span>
                <span className="text-xs ">(required)</span>
                
            </div>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={lastName}
            onChange={(e) =>
              setLastName({ lastName: e.currentTarget.value })
            }
                ></input>
                </div>}
                {(job.application_email == 'Required' || job.application_email == 'Optional') && 
           <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Email address</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={email}
            onChange={(e) =>
              setEmail({ email: e.currentTarget.value })
            }
                ></input>
            
                </div>}
            {(job.application_phone == 'Required' || job.application_phone == 'Optional') && 
            <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Phone number</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={phone}
             onChange={(e) =>
              setPhone({ phone: e.currentTarget.value })
            }
             ></input>
             </div>}
             {(job.application_location == 'Required' || job.application_location == 'Optional') && 
           <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Location</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={location}
            onChange={(e) =>
                        setLocation({ location: e.currentTarget.value })
                      }
            ></input>
            </div>}
            {(job.application_linkedin == 'Required' || job.application_linkedin == 'Optional') && 
           <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Linkedin</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={location}
            onChange={(e) =>
                        setLinkedin({ linkedin: e.currentTarget.value })
                      }
            ></input>
            </div>}
            {(job.application_github == 'Required' || job.application_github == 'Optional') && 
           <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Github</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={location}
            onChange={(e) =>
                        setGithub({ github: e.currentTarget.value })
                      }
            ></input>
            </div>}
            {(job.application_resume == 'Required' || job.application_resume == 'Optional') && 
           <div className="flex flex-col">
            <span className="text-xs mt-4 font-bold">Resume</span>
            <input type='file' 
            defaultValue={location}
            onChange={(e) =>
                        setResume({ resume: e.currentTarget.value })
                      }
            ></input>
            </div>}
            
                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={submit}
                  >
                    Submit application
                  </button>
                </div>
              </div>
              </form>
        </div>
    )
}