import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const routeParams = useParams();

  const pathUsername = routeParams.username;
  let message = "We cannot edit!";
  if (pathUsername === loggedInUsername) {
    message = "You can edit your profile.";
  }
  return (
    <div>
      <h3>Profile Card</h3>
      <h5>{message}</h5>
    </div>
  );
};

export default ProfileCard;
