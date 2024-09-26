import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/header/navBar";
import SingleFoodBody from "../../../components/dashboard/food/singleFoodBody";

function SingleFood() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <SingleFoodBody />
      </div>
    </div>
  );
}

export default SingleFood;
