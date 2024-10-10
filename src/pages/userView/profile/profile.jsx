import React from "react";
import NavBar from "../../components/home/navBar";
import ProfileBody from "../../components/profile/profile-body";
function Profile() {
  return (
    <div className="h-screen container mx-auto">
      <NavBar />
      <ProfileBody />
    </div>
  );
}

export default Profile;
