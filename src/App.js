import "./App.css";
import UserSignupPage from "./pages/UserSignupPage";
import UserLoginPage from "./pages/UserLoginPage";
import ApiProgress from "./shared/ApiProgress";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import React from "react";
import { render } from "@testing-library/react";

//browser router backendi tetiklediği için şimdilik hash router

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined,
  };

  onLoginSuccess = (username) => {
    this.setState({ username, isLoggedIn: true });
  };

  onLogoutSuccess = () => {
    this.setState({ username: undefined, isLoggedIn: false });
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <NavBarComponent
            username={username}
            isLoggedIn={isLoggedIn}
            onLogoutSuccess={this.onLogoutSuccess}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login"
                component={(props) => {
                  return (
                    <UserLoginPage
                      {...props}
                      onLoginSuccess={this.onLoginSuccess}
                    />
                  );
                }}
              />
            )}
            <Route path="/signup" component={UserSignupPage} />
            <Route
              path="/user/:username"
              component={(props) => {
                return <UserPage {...props} username={username} />;
              }}
            />
            <Redirect to="/" />
          </Switch>
        </Router>
        {/* <LanguageSelector /> */}

        {/* <div class="container" style={{ marginTop: 50 }}>
          <div class="row">
            <div class="col-lg-6">
              <UserSignupPage />
            </div>
            <div class="col-lg-6">
               <ApiProgress path="/api/user/login"> 
              <UserLoginPage />
             </ApiProgress>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
