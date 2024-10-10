import SingleExerciseBody from "../../../components/dashboard/exercise/singleExerciseBody";
import Navbar from "../../../components/home/navBar";
import SideBar from "../../../components/dashboard/sidebar";

function SingleExercise() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex space-x-4">
        <SideBar />
        <SingleExerciseBody />
      </div>
    </div>
  );
}

export default SingleExercise;
