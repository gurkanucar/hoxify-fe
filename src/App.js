import "./App.css";
import UserSignupPage from "./pages/UserSignupPage";
import UserLoginPage from "./pages/UserLoginPage";
import ApiProgress from "./shared/ApiProgress";

function App(props) {
  return (
    <div>
      <div class="container" style={{ marginTop: 50 }}>
        <div class="row">
          <div class="col-lg-6">
            <ApiProgress path="/api/user">
              <UserSignupPage />
            </ApiProgress>
          </div>
          <div class="col-lg-6">
            <ApiProgress path="/api/user/login">
              <UserLoginPage />
            </ApiProgress>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
