import { useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import createComment from '../queries/comments/createComment';
import createJob from '../queries/jobs/createJob';
import createStages from '../queries/jobs/createStages';

export default function CreateCommentModal(props) {
  let [isOpen, setIsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [insertComment, { data, loading, error }] = useMutation(createComment);
 

  if (loading) return 'Submitting...';
  

  const submit = (e) => {
    e.preventDefault();
  
    const newComment = {
      
     comment : comment.comment,
     jobId : props.jobId,
     applicantId : props.applicantId

    } ;

    insertComment({
      variables: {
       
        comment: newComment,
      },
    })
      
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
          className='font-bold'
        >
          Add a comment
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
                  className="text-xl font-medium leading-6 text-indigo-900"
                >
                  Add a new comment
                </Dialog.Title>
                <form onSubmit={submit}>
                <div className="mt-2">
                
                </div>

                <div>
                    Comment
                </div>

                <div>
                    <textarea className='border-2 p-2 border-gray-900 rounded-md' rows={10} cols={50}
                     onChange={(e) =>
                        setComment({ comment: e.currentTarget.value })
                      }></textarea>
                </div>

                <div className="flex flex-row mt-4">
                  <div className='mr-4'> 
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={submit}
                  >
                    Create comment
                  </button>
                </div>
                <div >
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-200 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  </div>
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
