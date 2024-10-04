import Navbar from "../../../components/home/navBar";
import SideBar from "../../../components/dashboard/sidebar";
import ExerciseBody from "../../../components/dashboard/exercise/exerciseBody";

function Exercise() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex ">
        <SideBar />
        <div className="w-[80%] bg-background overflow-y-auto">
          <ExerciseBody />
        </div>
      </div>
    </div>
  );
}

export default Exercise;
