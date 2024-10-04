import Setting from "../../../components/dashboard/setting/setting";
import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";
function SettingPage() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex">
        <SideBar />
        <Setting />
      </div>
    </div>
  );
}

export default SettingPage;
