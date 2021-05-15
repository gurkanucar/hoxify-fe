import React from "react";
import ProfileCard from "../components/ProfileCard";

const UserPage = (props) => {
  return (
    <div className="container">
      <h1>User Profile</h1>
      <ProfileCard username={props.username} />
    </div>
  );
};
export default UserPage;
