import "./App.css";
import UserSignupPage from "./pages/UserSignupPage";
import UserLoginPage from "./pages/UserLoginPage";

function App() {
  return (
    <div>
      <div class="container" style={{ marginTop: 50 }}>
        <div class="row">
          <div class="col-lg-6">
            <UserSignupPage />
          </div>
          <div class="col-lg-6">
            <UserLoginPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
