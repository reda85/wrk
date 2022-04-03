import { useState } from "react"
import parse from 'html-react-parser';

export default function JobAnnouncement(props) {
    const {job} = props
    const [firstName, setFirstName] = useState(null)
const [lastName, setLastName] = useState(null)
const [email, setEmail] = useState(null)
const [phone, setPhone] = useState(null)
const [location, setLocation] = useState(null)

    return(
        <div className="flex flex-col mt-6 w-3/4 justify-center">
            <h1 className="font-extrabold text-3xl">{job.title}</h1>
           
{parse(job.description)}
          

            <form >
                <div className='flex w-3/4 p-3 flex-col bg-gray-100 rounded-md'>
                <span className="text-xl my-4 font-bold">Apply here</span>
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
            <span className="text-xs mt-4 font-bold">Email address</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
             defaultValue={email}
            onChange={(e) =>
              setEmail({ email: e.currentTarget.value })
            }
                ></input>
            
            <span className="text-xs mt-4 font-bold">Phone number</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={phone}
             onChange={(e) =>
              setPhone({ phone: e.currentTarget.value })
            }
             ></input>
            <span className="text-xs mt-4 font-bold">Location</span>
            <input className="border-2 p-2 rounded-md border-gray-600"
            defaultValue={location}
            onChange={(e) =>
                        setLocation({ location: e.currentTarget.value })
                      }
            ></input>
                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                   
                  >
                    Submit application
                  </button>
                </div>
              </div>
              </form>
        </div>
    )
}