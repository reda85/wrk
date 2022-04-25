import { useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAuth } from '../context/AuthUserContext';
import createJob from '../queries/jobs/createJob';
import createStages from '../queries/jobs/createStages';

import { findJobs } from '../queries/jobs/getJobs';

export default function CreateJobModal() {
  const {user} = useAuth()
  let [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [insertJob, { data, loading, error }] = useMutation(createJob);
  const [insertStages, { stagesdata, stagesloading, stageserror }] = useMutation(createStages);

  if (loading) return 'Submitting...';
  

  const submit = (e) => {
    e.preventDefault();
    closeModal()
    const newJob = {
      
     title : title,
organization_id : user.organization_id,
application_firstname : 'Required',
application_lastname : 'Required',
application_email : 'Required',
application_phone : 'Optional',
application_location : 'Optional',
application_linkedin : 'Hidden',
application_github : 'Hidden',
application_website : 'Hidden',
application_resume : 'Required',
    } ;

    insertJob({
      variables: {
       
        job: newJob,
      },
    })
      .then((result) => {
      insertStages({
        variables: {
         
          jobId: result.data.insert_jobs_one.id,
        },
        refetchQueries: [
          {
            query: findJobs,
            variables: {
              organization_id : user.organization_id
            },
      }
    ]})
      
    }
    )
      .catch((error) => {
        console.log("errrror", error)
        
      });
  };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div >
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-black bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create new job
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
               <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create new job
                </Dialog.Title>
                <form onSubmit={submit}>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                  Enter the name of the job position you are hiring for. Once created, you will be taken to its setup screen where you can configure it.
                  </p>
                </div>

                <span className="text-xs text-gray-500 font-bold">Job title</span>

                <div>
                <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            defaultValue={title}
            onChange={(e) =>
                setTitle(e.currentTarget.value )}
                ></input>
                </div>

                <div className="flex flex-row mt-4">
                  <button
                    type="button"
                    className=" justify-center px-4 py-2 text-sm mr-4 font-medium text-white bg-black border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={submit}
                  >
                    Create job
                  </button>
               
                
                  <button
                    type="button"
                    className=" justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  </div>
                </form>
              </div>
              
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
