import Setting from "../../../components/dashboard/setting/setting";
import React from "react";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";
function SettingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <Setting />
      </div>
    </div>
  );
}

export default SettingPage;
