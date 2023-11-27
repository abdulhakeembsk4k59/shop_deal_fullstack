// ProfileDropdown.jsx

import React from 'react';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      {/* Add profile information and actions here */}
      <div className="profile-info">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="profile-image" />
        <div className="user-details">
          <p className="user-name">John Doe</p>
          {/* Additional user details if needed */}
        </div>
      </div>
      <hr />
      <div className="profile-actions">
        <p className="dropdown-item">Update Info</p>
        <p className="dropdown-item">Settings</p>
      </div>
    </div>
  );
};

export default ProfileDropdown;
