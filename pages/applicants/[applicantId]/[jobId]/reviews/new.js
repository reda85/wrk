//import DetailsSideBar from "../../../../components/detailsSideBar";


import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { findCandidateByPk } from "../../../../../queries/candidates/getCandidatebypk";
import dynamic from "next/dynamic";

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";

const evaluations = [
  { id: 1, evaluation: 'None', unavailable: false },
  { id: 2, evaluation: 'Strong Yes', unavailable: false },
  { id: 3, evaluation: 'Weak Yes', unavailable: false },
  { id: 4, evaluation: 'Weak No', unavailable: true },
  { id: 5, evaluation: 'Strong No', unavailable: false },
]

function MyListbox() {
  const [selectedEvaluation, setSelectedEvaluation] = useState(evaluations[0])

  return (
    <Listbox value={selectedEvaluation} onChange={setSelectedEvaluation}>
    <div className="relative mt-1">
      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
        <span className="block truncate">{selectedEvaluation.evaluation}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {evaluations.map((evaluation, id) => (
            <Listbox.Option
              key={id}
              className={({ active }) =>
                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                }`
              }
              value={evaluation}
            >
              {({ selectedEvaluation }) => (
                <>
                  <span
                    className={`block truncate ${
                        selectedEvaluation ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {evaluation.evaluation}
                  </span>
                  {selectedEvaluation ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
  )
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline',  'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      }

      const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
      ]

export default function NewReview() {
    const router = useRouter();
    const { jobId, applicantId } = router.query;
    const [value, setValue] = useState(null);
    const [candidate, setCandidate] = useState(null)
    const [getCandidate, { data, loading, error }] = useLazyQuery(findCandidateByPk)
    useEffect(() => {
      if (applicantId) {
       
        getCandidate({
        variables: {
          id : applicantId
        },
      })
    }
      }, [applicantId]);
   
      useEffect(() => {
        if (data) {
           
            setCandidate(data.candidates_by_pk);
            
        }
      }, [data]);
   
  
 

  return (
  <div>
     <div className="flex flex-row justify-between align-middle">
       <div className="h-16 p-4 flex flex-Row text-xl font-bold align-middle ">
            <div className="hover:bg-blue-50 cursor-pointer rounded-md p-1" onClick={() => router.back()}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>
        <div className="mx-2  text-black">Review kit</div>
    </div>
    </div>


    <div className="flex flex-row">
     <div className="w-1/2 shadow-inner">
        { candidate && 
        <div>
            <div className="mx-6 mt-2 text-blue-800 text-3xl font-extrabold">
{candidate.FirstName + ' ' + candidate.LastName}
         </div> 
         <div className="flex mt-3 mx-6 flex-row">

<div className="flex flex-row p-2 border-2 border-gray-200 rounded-md mr-2">
    <MailIcon className="h-5 w-5 mr-2" />
    {candidate.email}</div>
<div className="flex flex-row p-2 border-2 border-gray-200 rounded-md">
    <PhoneIcon className="h-5 w-5 mr-2" />
    {candidate.Phone}</div>
         </div>
         
         <div className="text-lg mx-6 mt-6 font-extrabold"> Resume</div>
     </div>}
     </div>
     <div className="w-1/2 h-screen shadow-inner">
     <QuillNoSSRWrapper className="h-full border-2" modules={modules} value={value || ''} onChange={setValue} formats={formats} theme="snow" />

     </div>
     
      </div>
      </div>
  );
}