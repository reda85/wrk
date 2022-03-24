import EditCommentModal from "./EditCommentModal";

export default function Commentdiv( props) {
    return(
        <div className="mx-2 p-2 rounded-md border-2 border-gray-200">
        
       <div className="text-xs flex flex-row justify-between ">
           <p>Marouane Reda left a comment</p>
           <div>
               <EditCommentModal comment={props.comment} />
               <button className="mx-2">Delete</button>
           </div>
       </div>
       <p>{props.comment.comment}</p>
                </div>
    )
}