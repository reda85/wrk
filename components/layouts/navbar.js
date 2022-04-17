import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Input } from 'antd'
import { Fragment, useCallback, useRef, useEffect, useState } from 'react'
import MenuLeft from './menu'
import { Dialog } from '@headlessui/react'
import { ArrowLeftIcon, ChevronRightIcon, DatabaseIcon, UserGroupIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { search } from '../../queries/candidates/search'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import {debounce} from 'lodash'


  export default function Navbar() {
    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    

   setQuery(null)
    setIsOpen(false)
   // setResults([])
    console.log('close', active, isOpen)
  }
useEffect( () => {
  if(!isOpen || query?.length == 0) {
    setResults(null)
  }
},[isOpen, query])

  function openModal() {
    setIsOpen(true)
  }

    const searchRef = useRef(null)
  const [query, setQuery] = useState(null)
  const [active, setActive] = useState(false)
  const [results, setResults] = useState(null)

 
  const [getSearch, { data, loading, error }] = useLazyQuery(search)

  const onChange = (query) =>  {
   
   console.log("query", query) 
    if (query.length > 0) {
    
      query='%'+query+'%'
      getSearch({
        variables: {
          query : query,
       
        },
        fetchPolicy: "network-only",
      }).then(data => { console.log("search", query, data); setResults(data.data.candidates); console.log("search", data.data.candidates)}
      )
    } else {
       console.log("search null", query);
      setResults(null)
    }
  }

 const setNewSearch = debounce((query) => {
  onChange(query);
 }, 1000);

  
 

 const searching = (e) => {
  e.preventDefault();
 
    console.log('e',e.currentTarget.value )
    setNewSearch(e.currentTarget.value);
  
};
  

return(
    <div className="px-4 py-1 mx-auto border-b  border-gray-200">
    <div className="relative flex items-center justify-between h-12 gap-2 ">
      <div className="flex items-center lg:px-0 w-full ">
        <div className="flex items-center justify-between w-full">
<span className='text-3xl font-bold  '>WorkBoard</span>

<div className="relative w-1/2" >
 {!isOpen && <input 

ref={searchRef}
onClick={openModal}

placeholder='Search candidates'
type='text'

className="w-full mx-2 pl-3 pr-6 py-2 text-lg focus:border-none focus:outline-none focus:bg-white  focus:bg-blend-darken sm:text-sm rounded-md bg-gray-200 border-gray-200 placeholder-gray-500" />}

  </div>    
                
<MenuLeft />
</div>

  <div className=' ' >
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          
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
            <div className=" flex justify-center p-2 ml-2 lg:px-0 w-full inset-0   ">
            <div className='w-1/2 relative'>
    <input 
onChange={searching}


type='text'

className="w-full mx-2 pl-3 pr-6 py-2 text-lg outline-none focus:border-none bg-white rounded-b-none  bg-blend-darken sm:text-sm rounded-md " />
  <div className="absolute w-full mx-2 pt-2 text-sm border-t-2 rounded-b-md  text-black bg-white">
        <ul >
          {results?.length > 0 && results?.map( (index,result)  => (
            <li  key={index} >
              <Link href="/jobs/" as={`/jobs/`}>
                <div className='flex flex-row py-2 justify-between align-center hover:cursor-pointer hover:bg-gray-100 rounded-md'>
                  <div className='flex flex-row justify-start'>
                    <UserIcon className='h-4 w-4 mx-3' />
                  {result.FullName}
                  <span>&nbsp;</span>
                  <p className='m-0'> - as </p>
                  <span>&nbsp;</span>
                  {result.stage?.job?.title}
                  </div>
                  <ChevronRightIcon className='h-4 w-4 mx-3' />
                  </div>
              </Link>
            </li>
          ))}
         { (!results ) && <div>
          <div className="flex mt-6 flex-col justify-center  items-center place-content-center flex-wrap">
            <div className="flex flex-row items-center">
                <UserGroupIcon className="h-5 w-5" />

            </div>
            <div className="text-md"> Candidate quick search</div>
            <div className="text-xs text-gray-500 "> Start typing to search through your active candidates by name.</div>
        </div>
           </div>}
           { (results?.length == 0) && <div>
          <div className="flex mt-6 flex-col justify-center  items-center place-content-center flex-wrap">
            <div className="flex flex-row items-center">
            <UserIcon className="h-5 w-5" />
<XIcon className="h-3 w-3" />

            </div>
            <div className="text-md"> No candidate found</div>
            <div className="text-xs text-gray-500 "> There are no active candidates that match your search.</div>
        </div>
           </div>}
        </ul>
        </div>
        </div>
        </div>
        </Dialog>
        </Transition>
        </div>
      
</div>
</div>
</div>
)
  }


