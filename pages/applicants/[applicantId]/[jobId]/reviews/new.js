//import DetailsSideBar from "../../../../components/detailsSideBar";


import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { findCandidateByPk } from "../../../../../queries/candidates/getCandidatebypk";
import dynamic from "next/dynamic";

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { getAuth } from "firebase/auth";
import { addReview } from "../../../../../queries/reviews/addReview";
import { useAuth } from "../../../../../context/AuthUserContext";
import toast from "react-hot-toast";

const evaluations = [
  { id: 1, evaluation: 'None', unavailable: false },
  { id: 2, evaluation: 'Strong Yes', unavailable: false },
  { id: 3, evaluation: 'Weak Yes', unavailable: false },
  { id: 4, evaluation: 'Weak No', unavailable: true },
  { id: 5, evaluation: 'Strong No', unavailable: false },
]


  

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
    const {user} = useAuth()
    const { jobId, applicantId } = router.query;
    const [value, setValue] = useState(null);
    const [candidate, setCandidate] = useState(null)
    const [evaluation, setEvaluation] = useState('Strong yes')
    const [getCandidate, { data, loading, error }] = useLazyQuery(findCandidateByPk)
    const [insertReview,] = useMutation(addReview)

    const submit = (e) => {
      e.preventDefault();
    insertReview({
      variables: {
        organization_id : user.organization_id,
       candidateId : applicantId,
       review : value,
       evaluation : evaluation,
     jobId : jobId
      },
    })
    .then( data => toast.success('Job has been updated succesfully'))
    .catch(error => toast.error(error))
  }

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
   
      const path='https://au.int/sites/default/files/announcements/38793-annc-auc_cv_template_french.pdf'
 

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
            <div className="mx-6 mt-2 text-blue-700 text-3xl font-extrabold">
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
         <div className="p-4 rounded-md">
         {candidate && candidate.resumeURL && candidate.resumeURL.split('.').pop().split('?')[0] == 'pdf' && <iframe className={candidate.resumeURL.split('.').pop().split('?')[0]} width="100%" height="600" frameBorder="0" src={`${candidate.resumeURL}&embedded=true`}></iframe> }
    {candidate && candidate.resumeURL && candidate.resumeURL.split('.').pop().split('?')[0] != 'pdf' && <iframe className={candidate.resumeURL.split('.').pop().split('?')[0]} width="100%" height="600" frameBorder="0" src={`https://view.officeapps.live.com/op/embed.aspx?src=${candidate.resumeURL}&embedded=true`}></iframe> }
     </div>
     </div>}
     </div>
     <div>
     <div>
     <div className="w-full h-1/2 shadow-inner">
     <QuillNoSSRWrapper placeholder="Write here your detailed review ..." className="h-full w-full border-2" modules={modules} value={value || ''} onChange={setValue} formats={formats} theme="snow" />

     
    
     </div>
     
</div>
<div className="inline-block my-4 relative w-full">
  <select defaultValue='Strong yes' onChange={(e) => setEvaluation(e.target.value)} className="block appearance-none w-full  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    
    <option >Strong yes</option>
    <option>Weak yes</option>
    <option>Strong no</option>
    <option>Weak no</option>
  </select>
  
</div>
<button
onClick={submit}
className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
>Post your review</button>
</div>

      </div>
      </div>
  );
}