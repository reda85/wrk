import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { findJobsbypk } from '../queries/jobs/getJobsbypk';
import { updateResumeByPk } from '../queries/candidates/updateResume';
import { useLazyQuery, useMutation } from '@apollo/client';
import { findCandidateByPk } from '../queries/candidates/getCandidatebypk';

export default function Dropzone(props) {
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    //const [file, setFile] = useState(null);
    const [candidate, setCandidate] = useState(null);
    const storage = getStorage();
const {jobId, applicantId} = props

const [ updateCandidate, { dataCandidate } ] = useMutation(updateResumeByPk)
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

    function onDrop(acceptedFiles) {
    // Do something with the files
    console.log('hnaa')
    acceptedFiles.map(file => {
        const imageref = ref(storage, `/resumes/${file.name}`);
        const uploadTask = uploadBytesResumable(imageref, file)
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      updateCandidate({
        variables: {
         id : applicantId,
         resumeURL : downloadURL,
    
        },
        refetchQueries: [
          {
            query: findJobsbypk,
            variables: {
              id : jobId
          }}],
         
      })
        
    
    });
  }
);
    })
  }
  

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
      <div>
          
      {candidate && ! (candidate.resumeURL) && <div className='flex flex-col align-center p-20 border-2 m-4 text-gray-700 border-dashed rounded-md bg-gray-50' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Glissez les fichiers ici ...</p> :
          <p>Glissez les fichiers ici, ou cliquez pour séléctionner des fichiers</p>
      }
      <aside>
        <h4>Files</h4>
        <ul>{candidate.resumeURL}</ul>
      </aside>
    </div> }
    {candidate && candidate.resumeURL && candidate.resumeURL.split('.').pop().split('?')[0] == 'pdf' && <iframe className={candidate.resumeURL.split('.').pop().split('?')[0]} width="100%" height="600" frameBorder="0" src={`${candidate.resumeURL}&embedded=true`}></iframe> }
    {candidate && candidate.resumeURL && candidate.resumeURL.split('.').pop().split('?')[0] != 'pdf' && <iframe className={candidate.resumeURL.split('.').pop().split('?')[0]} width="100%" height="600" frameBorder="0" src={`https://view.officeapps.live.com/op/embed.aspx?src=${candidate.resumeURL}&embedded=true`}></iframe> }
    </div>
  )
}