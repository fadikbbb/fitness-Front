import React from "react";
import WorkoutPlanBody from "../../../components/dashboard/workoutPlan/workoutPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";
function Workout() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
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
