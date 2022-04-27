import parse from 'html-react-parser'

export default function Reviewdiv( props) {
    return(
        <div className=" p-2 rounded-md border-2 border-gray-300">
        
       <div className="text-xs flex flex-row items-center align-middle justify-between ">
           < div className='flex flex-row '>
           <div className=' lowercase p-1 mr-1 text-xs  justify-center items-center align-middle self-center font-bold text-white bg-blue-600 rounded-md'>
mr
            </div>
           <p>Marouane Reda left a review</p>
           </div>
           <div className="text-xs flex flex-row justify-between ">
               <p className="" > Edit </p>
               <p className="mx-2 hover:cursor-pointer text-red-500">Delete</p>
           </div>
       </div>
       <p className=" text-lg font-medium text-indigo-800">{parse(props.review.review)}</p>
       {props.review.evaluation == 'Strong yes' && <p className="bg-gradient-to-r p-2 w-32 from-green-700 to-green-500 text-white rounded-md">{props.review.evaluation}</p>}
       {props.review.evaluation == 'Weak yes' && <p className="bg-gradient-to-r p-2 w-32 from-green-500 to-green-300 text-white rounded-md">{props.review.evaluation}</p>}
       {props.review.evaluation == 'Weak no' && <p className="bg-gradient-to-r p-2 w-32 from-rose-500 to-rose-300 text-white rounded-md">{props.review.evaluation}</p>}
       {props.review.evaluation == 'Strong no' && <p className="bg-gradient-to-r p-2 w-32 from-red-700 to-red-500 text-white rounded-md">{props.review.evaluation}</p>}
                </div>
    )
}