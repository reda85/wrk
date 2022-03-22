export default function JobExplain(props) {
    return(
        <div className="w-1/4 shadow-inner">
            {props.type == "description" && <div>
                <h2 className="p-1 text-md mt-6 font-bold"> Job descriptions </h2>
                <p className="p-1 text-xs font-light">You can author a description for each job you create in Wrk. This job description will be displayed on the public job post that potential candidates will visit.</p>
                </div>}
            
                {props.type == "details" && <div>
                <h2 className="p-1 text-md mt-6 font-bold"> Creating a job post </h2>
                <p className="p-1 text-xs font-light">You can preview your post as you build it using the link in the left column. This will create a temporary url you can visit to make sure your post looks exactly the way you want it to.</p>
                </div>}
        </div>
    )
}