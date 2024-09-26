import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/header/navBar";
import UserBody from "../../../components/dashboard/user/userBody";
function User() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div  className="w-[80%] p-3 bg-background overflow-y-auto">
        <UserBody />
        </div>
      </div>
    </div>
  );
}

export default User;
