import { useRouter } from "next/router"

export default function JobSetup(props) {
const {setup, job} = props
const router = useRouter()
console.log("setup ", props)
    return(
        <div className="flex flex-col w-60 p-2  shadow-inner">
           {setup=='details' ? <div className="flex flex-row p-2 justify-between bg-blue-500 text-white cursor-pointer rounded-md" >Job details</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/details`)} >Job details</div>}
           {setup=='description' ? <div className="flex flex-row p-2 justify-between bg-blue-500 text-white cursor-pointer rounded-md" >Job description</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" onClick={() => router.push(`/jobs/${job.id}/setup/description`)} >Job description</div>}
           {setup=='application' ? <div className="flex flex-row p-2 justify-between bg-blue-500 text-white cursor-pointer rounded-md" >Application form</div> : <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Application form</div>}
            <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Document templates</div>
            <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Hiring stages</div>
            <div className="flex flex-row p-2 justify-between hover:bg-blue-50 cursor-pointer rounded-md" >Hiring team</div>
        </div>
    )
}