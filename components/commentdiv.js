import EditCommentModal from "./EditCommentModal";

export default function Commentdiv( props) {
    return(
        <div className="mx-2 p-2 rounded-md border-2 border-gray-200">
        
       <div className="text-xs flex flex-row justify-between ">
           <p>Marouane Reda left a comment</p>
           <div className="text-xs flex flex-row justify-between ">
               <EditCommentModal  comment={props.comment} />
               <p className="mx-2 hover:cursor-pointer text-red-500">Delete</p>
           </div>
       </div>
       <p className=" text-lg text-indigo-800">{props.comment.comment}</p>
                </div>
    )
}