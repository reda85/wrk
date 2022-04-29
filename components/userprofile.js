import { LoadingOutlined } from "@ant-design/icons/lib/icons"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { updateJobByPk } from "../queries/jobs/updateJob"
import {toast} from 'react-hot-toast'
import { useAuth } from "../context/AuthUserContext"

export default function UserProfile() {

    const {user} = useAuth()
    
    const router = useRouter()
    


    const submit = (e) => {
        e.preventDefault();
      
       
    
       
      };
    
    return(
        <form onSubmit={submit}>
        <div className="flex p-4 flex-col w-3/4 shadow-inner  ">
            
            <span className="text-2xl font-extrabold">Your user profile</span>
            <p className="font-bold text-gray-500 "> Here is where you can edit information associated with your user account.</p>
            <span className="text-xl my-4 font-bold">Basic information</span>
            <div className="flex flex-row">
                <span className="text-xs mt-4 text-gray-500 font-bold">Firstname</span>
               
                
            </div>
     <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" defaultValue="Always required" />
     <div className="flex flex-row">
                <span className="text-xs mt-4 text-gray-500 font-bold">Lastname</span>
               
                
            </div>
     <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" defaultValue="Always required" />  
            <span className="text-xs mt-4 text-gray-500 font-bold">Email address</span>
           
            <input className="border-2 mt-2 p-2 bg-gray-200 rounded-md border-gray-600" defaultValue="Cannot be changed" disabled/>  
           
            <span className="text-xl mt-4 font-bold">Change password</span>
  
            <span className="text-xs mt-4 text-gray-500 font-bold">Old password</span>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" defaultValue="Cannot be changed" />  

            <span className="text-xs mt-4 text-gray-500 font-bold">New password</span>
            <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" defaultValue="Cannot be changed" />  


                <div className=" flex flex-row mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={submit}
                  >
                     <span>Save changes</span>
                  </button>
                </div>

               
            
        </div>
        </form>
    )
}