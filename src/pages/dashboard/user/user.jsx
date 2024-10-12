import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";
import UserBody from "../../../components/dashboard/user/userBody";
function User() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="w-[80%] bg-background overflow-y-auto">
          <UserBody />
        </div>
      </div>
    </div>
  );
}

export default User;
