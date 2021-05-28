import React, { Component } from "react";
import { getUsers } from "../api/apiCalls";
import { withTranslation } from "react-i18next";

/*
class Item extends Component {
  state = {
    username: undefined,
  };
  componentDidMount() {
    this.setState({ username: this.props.user.username });
  }

  render() {
    const { username } = this.state;
    return <div>{username}</div>;
  }
}
*/

class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getUsers().then((response) => {
      this.setState({
        users: response.data,
      });
    });
  }

  render() {
    const { users } = this.state;
    const { t } = this.props;
    return (
      <div className="card">
        <h3 className="card-header text-center">{t("Users")}</h3>
        <div className="list-group-flush">
          {users.map((user, index) => (
            /* <Item key={user.username} user={user} />*/
            <div
              className="list-group-item list-group-item-action"
              key={user.username}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default withTranslation()(UserList);
