import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Input } from 'antd'
import { Fragment, useCallback, useRef, useState } from 'react'
import MenuLeft from './menu'
import { Dialog } from '@headlessui/react'
import { DatabaseIcon } from '@heroicons/react/outline'
import { search } from '../../queries/candidates/search'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'


  export default function Navbar() {
    let [isOpen, setIsOpen] = useState(false)

    const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

 
  const [getSearch, { data, loading, error }] = useLazyQuery(search)

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
     let query1='%'+query
     let query2=query+'%'
      query='%'+query+'%'
      getSearch({
        variables: {
          query : query,
          query1 : query1,
          query2 : query2
        },
        fetchPolicy: "network-only",
      }).then(data => { console.log("search", data); setResults(data.data.candidates); console.log("search", data.data.candidates)}
      )
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])


    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

return(
    <div className="px-4 py-1 mx-auto border-b  border-gray-200">
    <div className="relative flex items-center justify-between h-12 gap-2 ">
      <div className="flex items-center lg:px-0 w-full ">
        <div className="flex items-center justify-between w-full">
<span className='text-3xl font-bold  '>WorkBoard</span>
<div>
<input 
onChange={onChange}
onFocus={onFocus}
placeholder='Search candidates'
type='text'
value={query}
className="w-1/2 mx-2 pl-3 pr-6 py-2 text-lg focus:outline-none focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 focus:bg-blend-darken sm:text-sm rounded-md bg-gray-200 border-gray-200 placeholder-gray-500" />
{ active && results.length > 0 && (
        <ul >
          {results.map( (index,result)  => (
            <li key={index}  >
              <Link href="/jobs/" as={`/jobs/`}>
                <a>{result.FirstName}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) }
      </div>
                
<MenuLeft />
</div>
</div>
</div>
</div>
)
  }


