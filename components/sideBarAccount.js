import { ArrowLeftIcon, ChevronRightIcon, EyeIcon } from "@heroicons/react/outline"
import { getAuth } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthUserContext"

export default function SideBarAccount(props) {
const {setup} = props
const {user} = useAuth()
const router = useRouter()
console.log("setup ", props)
console.log("user ", user)
    return(
        <div>
        <div className="flex flex-col flex-shrink w-64 font-bold p-2  shadow-inner">
           {setup=='profile' ? <div className="flex flex-row mt-2 p-2 justify-between bg-indigo-500 text-white cursor-pointer rounded-md" >User profile <ChevronRightIcon className="h-4 w-4" /> </div> : <div className="flex mt-2 flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/details`)} >User profile <ChevronRightIcon className="h-4 w-4" /> </div>}
           {setup=='organization' ? <div className="flex flex-row p-2 justify-between bg-indigo-500 text-white cursor-pointer rounded-md" >Job description <ChevronRightIcon className="h-4 w-4 text-white hover:text-black" /> </div> : <div className="flex flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/description`)} >Job description <ChevronRightIcon className="h-4 w-4" /> </div>}
           {setup=='jobboard' ? <div className="flex flex-row p-2 justify-between bg-indigo-500 text-white cursor-pointer rounded-md" >Application form <ChevronRightIcon className="h-4 w-4" /> </div> : <div className="flex flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/application`)}>Application form <ChevronRightIcon className="h-4 w-4" /> </div>}
            <div className="flex flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" >Templates <ChevronRightIcon className="h-4 w-4" /> </div>
            {setup=='cataegories' ? <div className="flex flex-row p-2 justify-between bg-indigo-500 text-white cursor-pointer rounded-md" >Hiring stages <ChevronRightIcon className="h-4 w-4" /> </div> : <div className="flex flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/hiringstages`)} >Hiring stages <ChevronRightIcon className="h-4 w-4" /> </div>}
            <div className="flex flex-row p-2 justify-between hover:bg-indigo-50 cursor-pointer rounded-md" >Hiring team <ChevronRightIcon className="h-4 w-4" /> </div>
        </div>
        <div className="text-black text-sm mx-3 p-2 mt-6">
           
        </div>
        </div>
    )
}