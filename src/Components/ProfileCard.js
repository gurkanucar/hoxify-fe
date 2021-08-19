import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import defaultPicture from "../assets/profile.png";

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const routeParams = useParams();

  const { user } = props;
  const { username, name, image } = user;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }

  const pathUsername = routeParams.username;
  let message = "We cannot edit!";
  if (pathUsername === loggedInUsername) {
    message = "You can edit your profile.";
  }
  return (
    <div className="card text-center shadow">
      <div className="card-header">
        <img
          className="rounded-circle shadow"
          width="200"
          alt="img"
          src={imageSource}
        />
      </div>
      <div className="card-body">
        <h3>
          {username}@{name}
        </h3>
      </div>
    </div>
  );
};

export default ProfileCard;
