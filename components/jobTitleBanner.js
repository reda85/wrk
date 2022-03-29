import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import  { addCandidate } from '../queries/candidates/createCandidate';


export default function JobTitleBanner(job) {
console.log('haaa job', job)
const router = useRouter()
//const {id} = router.query
const [isOpen, setIsOpen] = useState(false)
const [firstName, setFirstName] = useState(null)
const [lastName, setLastName] = useState(null)
const [email, setEmail] = useState(null)
const [phone, setPhone] = useState(null)
const [location, setLocation] = useState(null)
const [title, setTitle] = useState(job.title)
const [insertCandidate, { data, loading, error }] = useMutation(addCandidate);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const submit = (e) => {
    e.preventDefault();
  
    console.log('fiiiiiirst',firstName.firstName)

    insertCandidate({
     
      variables: {
       
        firstName: firstName.firstName,
        lastName: lastName.lastName,
        email: email.email,
        phone: phone.phone,
        location: location.location,
        stageId : job.job.stages[0].id
      },
    })
      
  };



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
            <div className="hover:bg-blue-50 cursor-pointer rounded-md p-1" onClick={() => router.push(`/jobs`)}><svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
</div>
        <div className="mx-2  text-black">{title}</div>
    </div>
    <div className="h-16 p-4 flex flex-Row text-xl font-bold align-middle ">
    <div className="hover:bg-blue-50 cursor-pointer rounded-md p-1" onClick={openModal}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
    </div>
    </div>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 min-h-screen  overflow-y-auto"
          onClose={closeModal}
        >
          <div className=" flex justify-end min-h-screen   text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
             <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

       
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new candidate
                </Dialog.Title>
                <form onSubmit={submit}>
                <div className='flex flex-col'>
                <span className="text-xl my-4 font-bold">Basic information</span>
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
                   onClick={submit}
                  >
                    Create candidate
                  </button>
                </div>
              </div>
              </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
      
    )
      }