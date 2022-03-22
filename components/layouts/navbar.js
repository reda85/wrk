import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Input } from 'antd'
import { Fragment, useState } from 'react'
import MenuLeft from './menu'
import { Dialog } from '@headlessui/react'


  export default function Navbar() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

return(
    <div className="px-4 py-1 mx-auto border-b  border-violet-200">
    <div className="relative flex items-center justify-between h-12 gap-2 ">
      <div className="flex items-center lg:px-0 w-full ">
        <div className="flex items-center justify-between w-full">
<span className='text-3xl font-bold  '>WorkBoard</span>

<input 
placeholder='Search candidates'
onClick={openModal}
type='search' className="w-1/2 mx-2 pl-3 pr-6 py-2 text-lg focus:outline-none focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-200 border-gray-200 placeholder-gray-500" />
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
              <div className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                </div>
                </Transition.Child>
                </div>
                </Dialog>
                </Transition>
                
<MenuLeft />
</div>
</div>
</div>
</div>
)
  }


