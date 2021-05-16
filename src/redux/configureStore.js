import { createStore } from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import * as ACTIONS from "./Constants";

const secureLs = new SecureLS({ encodingType: "aes" });

const getStateFromStorage = () => {
  const authData = secureLs.get(ACTIONS.AUTH_DATA);

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    name: undefined,
    image: undefined,
    password: undefined,
  };

  if (authData) {
    try {
      stateInLocalStorage = authData;
    } catch (error) {
      console.log("problem");
    }
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLs.set(ACTIONS.AUTH_DATA, newState);
  // localStorage.setItem(ACTIONS.AUTH_DATA, JSON.stringify(newState));
};

const configureStore = () => {
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
};

export default configureStore;
