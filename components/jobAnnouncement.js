import { useState } from "react"
import parse from 'html-react-parser';
import { useMutation } from "@apollo/client";
import { addCandidate } from "../queries/candidates/createCandidate";
import toast from "react-hot-toast";

export default function JobAnnouncement(props) {
    const {job} = props
    const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [location, setLocation] = useState('')
const [linkedin, setLinkedin] = useState('')
const [github, setGithub] = useState('')
const [resume, setResume] = useState('')


const [emailError, setEmailError] = useState(null)
const [lastnameError, setLastNameError] = useState(null)
const [FirstnameError, setFirstNameError] = useState(null)
const [phoneError, setPhoneError] = useState(null)

const [locationError, setLocationError] = useState(null)
const [linkedinError, setLinkedinError] = useState(null)
const [githubError, setGithubError] = useState(null)
const [resumeError, setResumeError] = useState(null)


const [insertCandidate, { data, loading, error }] = useMutation(addCandidate);

const submit = (e) => {
    e.preventDefault();
  
    console.log('fiiiiiirst',firstName)

    if( firstName == '') {
      setFirstNameError("This field is required")
      
    }
    else{
      setFirstNameError(null)
    }

    if( lastName == '') {
      setLastNameError("This field is required")
    
    }
    else{
      setLastNameError(null)
    }

    if( email == '') {
      setEmailError("This field is required")
    
    }
    else{
      setEmailError(null)
    }

    if(job.application_phone == 'Required' && phone == '') {
      setPhoneError("This field is required")
     
    }
    else{
      setPhoneError(null)
    }


    if(job.application_location == 'Required' && location == '') {
      setLocationError("This field is required")
      
    }
    else{
      setLocationError(null)
    }

    if(job.application_linkedin == 'Required' && linkedin == '') {
      setLinkedinError("This field is required")
      
    }
    else{
      setLinkedinError(null)
    }


    if(job.application_github == 'Required' && github == '') {
      setGithubError("This field is required")
    
    }
    else{
      setGithubError(null)
    }


    if(job.application_resume == 'Required' && resume == '') {
      setResumeError("This field is required")
     
    }
    else{
      setResumeError(null)
    }


if((job.application_resume == 'Required' && resume == '') || (job.application_github == 'Required' && github == '') || (job.application_linkedin == 'Required' && linkedin == '') || (job.application_location == 'Required' && location == '') || (job.application_phone == 'Required' && phone == '') || ( email == '') || ( lastName == '') || ( firstName == '')) {
  console.log('hnaiehaheao')
  return;
}
else{
  console.log('rrrrrr')
    insertCandidate({
     
      variables: {
       
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        location: location,
        stageId : job.stages[0].id
      },
    }).then( toast.success('Your application have been submitted successfully')).catch( e =>
      toast.error(e)
    )
  }  
  };

    return(
        <div className="flex flex-col mt-6 w-3/4 justify-center">
            <h1 className="font-black text-indigo-500 text-4xl">{job.title}</h1>
           
{job.description && <article className="prose-sm ">{parse(job.description)}</article>}
          

<form onSubmit={submit}>
                <div className='flex w-3/4 p-3 mt-4 border-2 flex-col border-gray-300 rounded-md'>
                <span className="text-xl my-6 font-bold">Apply here</span>
                {(job.application_firstname == 'Required' || job.application_firstname == 'Optional') && 
           <div className="flex mt-6 flex-col">
               <div className="flex flex-row">
                <span className="text-xs font-bold">First Name </span>
                {job.application_firstname == 'Required' && <span className="text-xs ">(required)</span>}
                
            </div>
            
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            defaultValue={firstName}
            onChange={(e) =>
              setFirstName(e.currentTarget.value )
            }
            
                ></input>
                {FirstnameError && <p className="text-xs text-red-500">{FirstnameError}</p>}
                </div>}
                {(job.application_lastname == 'Required' || job.application_lastname == 'Optional') && 
            <div className="flex flex-col">
                  <div className="flex mt-4 flex-row">
                <span className="text-xs font-bold">Last Name</span>
                {job.application_lastname == 'Required' && <span className="text-xs ">(required)</span>}
                
            </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            defaultValue={lastName}
            onChange={(e) =>
              setLastName(e.currentTarget.value )
            }
                ></input>
                {lastnameError && <p className="text-xs text-red-500">{lastnameError}</p>}
                </div>}
                {(job.application_email == 'Required' || job.application_email == 'Optional') && 
           <div className="flex flex-col">
             <div className="flex mt-4  flex-row">
            <span className="text-xs font-bold">Email address</span>
            {job.application_email == 'Required' && <span className="text-xs ">(required)</span>}
            </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
             defaultValue={email}
            onChange={(e) =>
              setEmail( e.currentTarget.value )
            }
                ></input>
                {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            
                </div>}
            {(job.application_phone == 'Required' || job.application_phone == 'Optional') && 
            <div className="flex flex-col">
              <div className="flex mt-4  flex-row">
            <span className="text-xs font-bold">Phone number</span>
            {job.application_phone == 'Required' && <span className="text-xs ">(required)</span>}
            </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-5000"
            defaultValue={phone}
             onChange={(e) =>
              setPhone(e.currentTarget.value )
            }
             ></input>
             {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
             </div>}
             {(job.application_location == 'Required' || job.application_location == 'Optional') && 
           <div className="flex flex-col">
             <div className="flex mt-4  flex-row">
            <span className="text-xs  font-bold">Location</span>
            {job.application_location == 'Required' && <span className="text-xs ">(required)</span>}
           </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            defaultValue={location}
            onChange={(e) =>
                        setLocation( e.currentTarget.value )
                      }
            ></input>
             {locationError && <p className="text-xs text-red-500">{locationError}</p>}
            </div>}
            {(job.application_linkedin == 'Required' || job.application_linkedin == 'Optional') && 
           <div className="flex flex-col">
             <div className="flex mt-4  flex-row">
            <span className="text-xs  font-bold">Linkedin</span>
            {job.application_linkedin == 'Required' && <span className="text-xs ">(required)</span>}
            </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            defaultValue={linkedin}
            onChange={(e) =>
                        setLinkedin(e.currentTarget.value )
                      }
            ></input>
            {linkedinError && <p className="text-xs text-red-500">{linkedinError}</p>}
            </div>}
            {(job.application_github == 'Required' || job.application_github == 'Optional') && 
           <div className="flex flex-col">
             <div className="flex mt-4 flex-row">
            <span className="text-xs  font-bold">Github</span>
            {job.application_github == 'Required' && <span className="text-xs ">(required)</span>}
            </div>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            defaultValue={location}
            onChange={(e) =>
                        setGithub( e.currentTarget.value )
                      }
            ></input>
             {githubError && <p className="text-xs text-red-500">{githubError}</p>}
            </div>}
            {(job.application_resume == 'Required' || job.application_resume == 'Optional') && 
           <div className="flex flex-col">
             <div className="flex mt-4 flex-row">
            <span className="text-xs font-bold">Resume</span>
            {job.application_resume == 'Required' && <span className="text-xs ">(required)</span>}
            </div>
            <input type='file' 
            defaultValue={location}
            onChange={(e) =>
                        setResume( e.currentTarget.value )
                      }
            ></input>
                    {resumeError && <p className="text-xs text-red-500">{resumeError}</p>}
            </div>}
            
                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={submit}
                  >
                    {loading ? 'Submitting...' : 'Submit application'}
                  </button>
                </div>
              </div>
              </form>
        </div>
    )
}