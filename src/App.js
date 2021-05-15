import "./App.css";
import UserSignupPage from "./pages/UserSignupPage";
import UserLoginPage from "./pages/UserLoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import React from "react";

//browser router backendi tetiklediği için şimdilik hash router

class App extends React.Component {
  //static contextType = Authentication;

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Router>
          <NavBarComponent />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={UserLoginPage} />}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
