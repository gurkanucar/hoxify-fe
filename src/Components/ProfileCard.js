import React from "react";

import { withRouter } from "react-router-dom";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  const loggedUsername = props.username;

  let message = "We cannot edit!";

  if (loggedUsername === pathUsername) {
    message = "You can edit your profile.";
  }

  return (
    <div>
      <h3>Profile Card</h3>
      <h5>With router: {pathUsername}</h5>
      <h5>With props: {loggedUsername}</h5>
      <h1>{message}</h1>
    </div>
  );
};

export default withRouter(ProfileCard);
