import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Input } from 'antd'
import { Fragment } from 'react'
import MenuLeft from './menu'



  export default function Navbar() {

return(
    <div className="px-4 py-1 mx-auto border-b dark:border-gray-700 border-gray-300">
    <div className="relative flex items-center justify-between h-12 gap-2 ">
      <div className="flex items-center lg:px-0 w-full ">
        <div className="flex items-center justify-between w-full">
<span className='text-3xl font-bold  '>WorkBoard</span>

<input 
placeholder='Search candidates'
type='search' className="w-1/2 mx-2 pl-3 pr-6 py-2 text-lg focus:outline-none focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-200 border-gray-200 placeholder-gray-500" />

<MenuLeft />
</div>
</div>
</div>
</div>
)
  }


