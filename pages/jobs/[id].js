import DetailsSideBar from "../../components/detailsSideBar";
import CandidatesSideBar from "../../components/candidatesSideBar";
import StagesSideBar from "../../components/stagesSidebar";
import JobStatusBanner from "../../components/jobStatusBanner";
import JobTitleBanner from "../../components/jobTitleBanner";


export default function Job() {

    
  return (
  <div>
      <JobStatusBanner />
      <JobTitleBanner />
    <div className="flex flex-row">
      <StagesSideBar />
      <CandidatesSideBar />
      <DetailsSideBar />
      </div>
      </div>
  );
}