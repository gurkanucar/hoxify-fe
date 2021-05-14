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

//browser router backendi tetiklediği için şimdilik hash router

function App(props) {
  return (
    <div>
      <Router>
        <NavBarComponent />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/user/:username" component={UserPage} />
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

export default App;
