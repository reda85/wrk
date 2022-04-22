import { EyeIcon } from "@heroicons/react/outline"
import { getAuth } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthUserContext"

export default function JobSetup(props) {
const {setup, job} = props
const {user} = useAuth()
const router = useRouter()
console.log("setup ", props)
console.log("user ", user)
    return(
        <div>
        <div className="flex flex-col flex-shrink w-64 font-bold p-2  shadow-inner">
           {setup=='details' ? <div className="flex flex-row mt-2 p-2 justify-between bg-blue-700 text-white cursor-pointer rounded-md" >Job details</div> : <div className="flex mt-2 flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/details`)} >Job details</div>}
           {setup=='description' ? <div className="flex flex-row p-2 justify-between bg-blue-700 text-white cursor-pointer rounded-md" >Job description</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/description`)} >Job description</div>}
           {setup=='application' ? <div className="flex flex-row p-2 justify-between bg-blue-700 text-white cursor-pointer rounded-md" >Application form</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/application`)}>Application form</div>}
            <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Templates</div>
            {setup=='hiring' ? <div className="flex flex-row p-2 justify-between bg-blue-700 text-white cursor-pointer rounded-md" >Hiring stages</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/hiringstages`)} >Hiring stages</div>}
            <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Hiring team</div>
        </div>
        <div className="text-black text-sm mx-3 p-2 mt-6">
            <h2 className="font-bold ">Job post</h2>
<div className="flex items-center text-xs text-slate-500 flex-row" >
{user?.organization && <Link  href={`/boards/${user.organization}/${job.id} `}>
    <a target='_blank' className="flex font-bold items-center text-xs text-slate-500 flex-row">
    <EyeIcon className="h-4 w-4 mr-1" />
    Preview job post
    </a>
  </Link> }
</div>
        </div>
        </div>
    )
}