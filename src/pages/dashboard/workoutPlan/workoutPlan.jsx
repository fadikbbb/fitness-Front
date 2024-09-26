import React from "react";
import WorkoutPlanBody from "../../../components/dashboard/workoutPlan/workoutPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/header/navBar";
function Workout() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
      <WorkoutPlanBody />
      </div>
    </div>
  );
}

export default Workout;
