import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { updateJobByPk } from '../queries/jobs/updateJob';
import { findJobsbypk } from '../queries/jobs/getJobsbypk';
import { useRouter } from 'next/router';
import {toast} from 'react-hot-toast'
import { LoadingOutlined } from '@ant-design/icons/lib/icons';

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

export default function JobDescription(props) {
    const {job} = props
    const router = useRouter()
    console.log('job indescription', props)
    const [value, setValue] = useState(job.description);
    const [title, setTitle] = useState(job.title)
const [category, setCategory] = useState(job.category)

const [type, setType] = useState(job.type)
const [country, setCountry] = useState(job.country)
const [location, setLocation] = useState(job.location)
const [updateJob, { data, loading, error }] = useMutation(updateJobByPk);

    const submit = (e) => {
        e.preventDefault();
      
       console.log('fing value', value)
    
        updateJob({
          variables: {
           description : value,
           category : job.category,
           title : job.title,
           
       
         id : job.id
          },
          refetchQueries: [
            {
              query: findJobsbypk,
              variables: {
                id : job.id
            }}],
            onCompleted : (data) => {router.push(`/jobs/${job.id}/setup/description`)} ,
        }).then( data => toast.success('Job has been updated succesfully'))
        .catch(error => toast.error(error))
          
      };
    
    return(
        <div>
          
            <form type='submit' onSubmit={submit}>
            <div>
    <div className='flex h-3/4 p-4 flex-col  shadow-inner '>
    <span className="text-2xl font-extrabold ">Job description</span>
        <QuillNoSSRWrapper className='h-full border-2' modules={modules} value={value || ''} onChange={setValue} formats={formats} theme="snow" />
        
        </div>
       
      </div>
       <button
       type="button"
       className="inline-flex justify-center m-4 px-4 py-2 w-40 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
       onClick={submit}
     >
       {loading ? <LoadingOutlined /> : <span>Save changes</span>}
     </button>
     </form>
     </div>)
}