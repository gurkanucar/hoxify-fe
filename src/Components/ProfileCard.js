import React from "react";

import { withRouter } from "react-router-dom";
/*import AuthenticationContext, {
  Authentication,
} from "../shared/AuthenticationContext";*/

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

export default withRouter(ProfileCard);
