import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  let message = "We cannot edit!";
  if (props.loggedUsername === pathUsername) {
    message = "You can edit your profile.";
  }
  return (
    <div>
      <h3>Profile Card</h3>
      <h5>{message}</h5>
    </div>
  );
};

// class ProfileCardContextWrapper extends React.Component {
//   static contextType = Authentication;

//   render() {
//     return (
//       <div>
//         <ProfileCard {...this.props} username={this.context.state.username} />
//       </div>
//     );
//   }
// }

const mapStateToProps = (store) => {
  return {
    loggedUsername: store.username,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));
