import React from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from './profileForm'; // Adjust path as necessary

function ProfileBody() {
  const user = {
    firstName: 'Fadi',
    lastName: 'Kabbani',
    email: 'fadi.kabbani@example.com'
    // Add other user details as needed
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col gap-4">
        <ProfileForm user={user} />
        <Link to="/profile/password" className="btn">Update Password</Link>
        <Link to="/profile/delete" className="btn">Delete Account</Link>
        <Link to="/profile/logout" className="btn">Logout</Link>
      </div>
    </div>
  );
}

export default ProfileBody;
