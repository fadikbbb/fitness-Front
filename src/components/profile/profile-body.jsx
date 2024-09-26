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
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col gap-4">
        <Link to={`/profile/your-workout`}>your workout</Link>
        <Link to={`profile/your-food`}>your food</Link>
        <Link to={`/profile/edit-profile/${userId}`}>account details</Link>
        <DeleteAccount userId={userId} />
        <Logout token={token} />
      </div>
    </div>
  );
}

export default ProfileBody;
