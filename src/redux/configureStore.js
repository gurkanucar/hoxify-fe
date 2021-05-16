import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import * as ACTIONS from "./Constants";
import thunk from "redux-thunk";

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
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
};

export default configureStore;
