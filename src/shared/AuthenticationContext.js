import React, { Component } from "react";

export const Authentication = React.createContext();

export default class AuthenticationContext extends Component {
  state = {
    isLoggedIn: false,
    username: undefined,
    name: undefined,
    image: undefined,
    password: undefined,
  };

  onLoginSuccess = (authState) => {
    this.setState({ ...authState, isLoggedIn: true });

    /*  this.setState({
      username: authState.username,
      name: authState.name,
      password: authState.password,
      image: authState.image,
      isLoggedIn: true,
    });*/
  };

  onLogoutSuccess = () => {
    this.setState({ username: undefined, isLoggedIn: false });
  };

  render() {
    return (
      <Authentication.Provider
        value={{
          state: { ...this.state },
          onLoginSuccess: this.onLoginSuccess,
          onLogoutSuccess: this.onLogoutSuccess,
        }}
      >
        {this.props.children}
      </Authentication.Provider>
    );
  }
}
