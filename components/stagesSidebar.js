const stages = [
    {name : 'Réception'},
    {name : 'Screen'},
    {name : 'Hired'}
]

export default function StagesSideBar() {

    return(
        <div className="flex flex-col flex-shrink w-40 p-2 border-2">
            {stages.map(stage => {
                return <div className="flex flex-row p-2 justify-between hover:bg-violet-50 cursor-pointer rounded-md">
                    <div className="flex flex-row justify-start">
                        {stage.name == "Réception" ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
</svg> :
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
</svg>}
                        {stage.name}</div>
                    0</div>
            })}
        </div>
    )
} 