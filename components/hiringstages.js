import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function HiringStages(props) {

    const {job} = props
    const [stages, setStages] = useState(job.stages)
    
    const [selectedStage, setSelecteStage] = useState(null)

    const reorder = (startIndex, endIndex) => {
        const result = Array.from(stages);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
      };
    
      const onDragEnd = (result) => {
        // dropped outside the list
        console.log('stages', stages)
        if (!result.destination) {
          return;
        }
    
        const newStages = reorder(result.source.index, result.destination.index);
        console.log('newStages', newStages)
        setStages(newStages);
      };
    

    return(
        <div>
<h2>Hiring stages</h2>
<DragDropContext onDragEnd={onDragEnd}>  
            <Droppable droppableId="droppable"  >  
                {(provided, snapshot) => (  
                    <div className="bg-gray-200"  
                        {...provided.droppableProps}  
                        ref={provided.innerRef}  
                    >  
            {stages && stages.map((stage, index) => { return(
                <Draggable isDragDisabled={(stage.name == 'Recrutement'  || stage.name == 'Réception' || stage.name == 'Archive')} draggableId={stage.id.toString()} index={index} key={stage.id}>  
                {(provided, snapshot) => (  
                   <div  
                     ref={provided.innerRef}  
                     {...provided.draggableProps}  
                     {...provided.dragHandleProps}  
                   >  
                   <div className="p-2 w-60 bg-white border-2 border-gray-100 rounded-sm">
                    {stage.name}
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
         

            
        </div>
    )
}