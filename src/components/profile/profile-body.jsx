import React from "react";
import Logout from "../auth/logout";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";
import DeleteAccount from "./deleteAccount";

import { useEffect } from "react";
import { Link } from "react-router-dom";
function ProfileBody() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    dispatch(setUserId(decodedToken.userId));
  }, [dispatch, token]);
  const userId = useSelector((state) => state.auth.userId);
  return (
    <div className="p-4 h-[calc(100vh-72px)] justify-center  flex flex-col items-center">
      <div className="justify-center p-4 flex flex-col items-center gap-4 shadow-lg rounded-lg w-full">
        <h1 className="text-5xl font-bold mb-4">Profile</h1>
        <Link to={`/profile/edit-profile/${userId}`}>account details</Link>
        <Link to={`/profile/your-workout`}>your workout plan</Link>
        <Link to={`profile/your-food`}>your nutrition plan</Link>
        <Link to={`/profile/weekly-report`}>Weekly report</Link>
        <DeleteAccount userId={userId} />
        <div className="flex justify-end w-[100px]">
          <Logout token={token} textLogout={"Logout"} />
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
