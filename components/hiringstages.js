import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function HiringStages(props) {

    const {job} = props
    const [stages, setStages] = useState(job.stages)
    const [mystages, setMystages] = useState(stages.slice(1,-1))
    const [selectedStage, setSelecteStage] = useState(null)

    const reorder = (startIndex, endIndex) => {
        const result = Array.from(mystages);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
      };
    
      const onDragEnd = (result) => {
        // dropped outside the list
        console.log('stages', mystages)
        if (!result.destination) {
          return;
        }
    
        const newStages = reorder(result.source.index, result.destination.index);
        console.log('newStages', newStages)
        setMystages(newStages);
      };
    

    return(
        <div className="p-4">
<span className="text-2xl font-extrabold">Hiring stages</span>
<p className="font-bold text-gray-500 w-100"> Here is where you can manage the hiring stages for this Job. You can also control the order of the stages by dragging and dropping.</p>
<div className="p-4 w-80 bg-white font-bold border-2 border-gray-200 rounded-md flex flex-row justify-between">
                    <div>Réception</div>
                   
                    </div>
<DragDropContext onDragEnd={onDragEnd}>  
            <Droppable droppableId="droppable"  >  
                {(provided, snapshot) => (  
                    <div className="bg-gray-200 w-80"  
                        {...provided.droppableProps}  
                        ref={provided.innerRef}  
                    >  
                    
                   
            {mystages && mystages.map((stage, index) => { return(
                <Draggable  draggableId={stage.id.toString()} index={index} key={stage.id}>  
                {(provided, snapshot) => (  
                  <div>
                   <div  
                     ref={provided.innerRef}  
                     {...provided.draggableProps}  
                     {...provided.dragHandleProps}  
                   >  
                   <div className="p-4 w-80 bg-white font-bold border-2 border-gray-200 rounded-md flex flex-row justify-between">
                    <div>{stage.name}</div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg>
                    </div>
                   </div>  
                
                </div>
                )}  
            </Draggable>  
             )}  
            
         )}  
         {provided.placeholder}
         </div>
                )}
     </Droppable>  
 </DragDropContext>
         

      <button
       type="button"
       className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
       > Add a new stage</button>      
        </div>
    )
}