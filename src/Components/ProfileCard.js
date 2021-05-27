import React, { useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  let message = "We cannot edit!";
  if (pathUsername === props.loggedUsername) {
    message = "You can edit your profile.";
  }
  return (
    <div>
      <h3>Profile Card</h3>
      <h5>{message}</h5>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    loggedUsername: store.username,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));
