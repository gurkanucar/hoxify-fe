import { createStore } from "redux";
import authReducer from "./authReducer";

const loggedInstate = {
  isLoggedIn: true,
  username: "asd",
  name: "adqweqwe",
  image: undefined,
  password: "passs",
};

const configureStore = () => {
  return createStore(
    authReducer,
    loggedInstate,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
