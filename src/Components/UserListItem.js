import React from "react";
import defaultPicture from "../assets/profile.png";
import { Link } from "react-router-dom";
const UserListItem = (props) => {
  const { user } = props;
  const { username, name, image } = user;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }

  return (
    <Link
      to={`/user/${username}`}
      className="list-group-item list-group-item-action"
    >
      <img className="rounded-circle" width="36" alt="img" src={imageSource} />
      <span className="pl-2">
        {name}@{username}
      </span>
    </Link>
  );
};

export default UserListItem;
