import { createStore } from "redux";
import authReducer from "./authReducer";

import * as ACTIONS from "./Constants";

const configureStore = () => {
  const authData = localStorage.getItem(ACTIONS.AUTH_DATA);

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    name: undefined,
    image: undefined,
    password: undefined,
  };

  if (authData) {
    try {
      stateInLocalStorage = JSON.parse(authData);
    } catch (error) {
      console.log("problem");
    }
  }

  const store = createStore(
    authReducer,
    stateInLocalStorage,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    localStorage.setItem(ACTIONS.AUTH_DATA, JSON.stringify(store.getState()));
  });

  return store;
};

export default configureStore;
