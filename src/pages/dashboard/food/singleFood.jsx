import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import NavBar from "../../../components/home/navBar";
import SingleFoodBody from "../../../components/dashboard/food/singleFoodBody";

function SingleFood() {
  return (
    <div className="min-h-screen bg-gray-100 container mx-auto">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="w-[80%] bg-background overflow-y-auto">
          <SingleFoodBody />
        </div>
      </div>
    </div>
  );
}

export default SingleFood;
