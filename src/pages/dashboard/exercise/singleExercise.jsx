import SingleExerciseBody from "../../../components/dashboard/exercise/singleExerciseBody";
import Navbar from "../../../components/home/navBar";
import SideBar from "../../../components/dashboard/sidebar";

function SingleExercise() {
  return (
    <div>
      <Navbar />
      <div className="flex space-x-4">
        <SideBar />
        <SingleExerciseBody />
      </div>
    </div>
  );
}

export default SingleExercise;
