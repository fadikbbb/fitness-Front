import React from "react";
import WorkoutPlanBody from "../../../components/dashboard/workoutPlan/workoutPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";
function Workout() {
  return (
    <div className=" bg-gray-100">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="w-[80%] ">
          <WorkoutPlanBody />
        </div>
      </div>
    </div>
  );
}

export default Workout;
