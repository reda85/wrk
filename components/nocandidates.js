import { UserIcon, XIcon } from "@heroicons/react/solid";

export default function NoCandidates() {
    return(
        <div className="flex mt-6 flex-col justify-center items-center place-content-center flex-wrap">
            <div className="flex flex-row items-center">
                <UserIcon className="h-5 w-5" />
<XIcon className="h-3 w-3" />
            </div>
            <div className="text-md"> No candidates</div>
            <div className="text-xs text-gray-500 "> There are no candidates at this stage.</div>
        </div>
    )
}