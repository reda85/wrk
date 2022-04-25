import { useMutation } from "@apollo/client";
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updatesatgeByPk, updatesatgeNameByPk } from "../queries/jobs/updateSatge";
import { findJobsbypk } from "../queries/jobs/getJobsbypk"
import { addstageByPk } from "../queries/jobs/addStage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EditStageModal from "./EditStageModal";

export default function HiringStages(props) {

    const {job} = props
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [title, setTitle] = useState(null)
    const [stages, setStages] = useState(job.stages)
    const [mystages, setMystages] = useState(stages.slice(1,-1))
    const [selectedStage, setSelecteStage] = useState(null)
    const [updateStage, ] = useMutation(updatesatgeByPk);
    const [updateStageName, ] = useMutation(updatesatgeNameByPk);
    const [addStage,data ] = useMutation(addstageByPk);

    useEffect(() => {
      setStages(job.stages);
      setMystages(job.stages.slice(1,-1));
    }, [job]);

    


    function closeModal() {
      setIsOpen(false)
    }

    function closeEditModal() {
      setIsOpenEdit(false)
    }


  console.log("kridi", stages)
    function openModal() {
      setIsOpen(true)
    }
    const submit = (e) => {
      e.preventDefault();
      addStage({
        variables: {
          name: title,
          jobId : job.id,
          organization_id : stages[0].organization_id,
         id_recrutement : stages[stages.length - 2].id,
         id_archive : stages[stages.length - 1].id,
          position : stages.length,
          position1 : stages.length - 1,
          position2: stages.length - 2,
    
        },
        refetchQueries : [{
          query: findJobsbypk,
          variables: {
            jobId : job.id
          },
    }] ,
    
    awaitRefetchQueries: true ,  
    fetchPolicy: 'network-only',
    onCompleted : (data) => { console.log("ttt",data);router.push(`/jobs/${job.id}/setup/hiringstages`)},  
      })
      closeModal()}
      
      useEffect(() => {
        setStages(job.stages)
      },[job])
     

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
        newStages.map((stage, index) => {
          updateStage({
            variables: {
             
              position : index + 1,
         id : stage.id
            },
            refetchQueries : [{
              query: findJobsbypk,
              variables: {
                jobId : job.id
              },
        }]      
          })
        })
      };
    
      const submitEdit = (e) => {
        e.preventDefault();
        updateStageName({
          variables: {
           
            name : title,
       id : selectedStage.id
          },
          refetchQueries : [{
            query: findJobsbypk,
            variables: {
              jobId : job.id
            },
      }]      
        })
        }

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
                    <div>
                     
<Popover className="relative">
      <Popover.Button><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
</svg></Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex  flex-col w-36 border-2 bg-white rounded-md border-gray-300">
        <div className="hover:bg-gray-100 hover:cursor-pointer p-1 m-1" onClick={() => {console.log('hihihih');setIsOpenEdit(true); setSelecteStage(stage)}}>
                          <p className="text-sm font-medium text-gray-900">
                            Edit stage
          </p>
          
          </div>
          <div className="hover:bg-gray-100 hover:cursor-pointer p-1 m-1">
                          <p className="text-sm font-medium text-gray-900">
                            Delete stage
          </p>
         
          </div>
        </div>

      
      </Popover.Panel>
    </Popover>
   
                    </div>
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
       onClick={e => {setIsOpen(true)}}
       > Add a new stage</button>  
             <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
               <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a new stage
                </Dialog.Title>
                <form onSubmit={submit}>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                  Enter the name of the new stage.
                  </p>
                </div>

                <div>
                    Stage name
                </div>

                <div>
                    <input
                     onChange={(e) =>
                        setTitle(e.currentTarget.value )
                      }></input>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={submit}
                  >
                    Create stage
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </div>
              
            </Transition.Child>
          </div>
        </Dialog>
      </Transition> 
      <div> 
      <Transition appear show={isOpenEdit} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEditModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
               <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit modal
                </Dialog.Title>
                <form onSubmit={submit}>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                  Enter the name of the job position you are hiring for. Once created, you will be taken to its setup screen where you can configure it.
                  </p>
                </div>

                <span className="text-xs text-gray-500 font-bold">Job title</span>

                <div>
                <input className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            defaultValue={selectedStage?.name}
            onChange={(e) =>
                setTitle(e.currentTarget.value )}
                ></input>
                </div>

                <div className="flex flex-row mt-4">
                  <button
                    type="button"
                    className=" justify-center px-4 py-2 text-sm mr-4 font-medium text-white bg-black border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={submitEdit}
                  >
                    Edit stage
                  </button>
               
                
                  <button
                    type="button"
                    className=" justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-700"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  </div>
                </form>
              </div>
              
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </div>
       
        </div>
    )
}