const defaultState = {
  isLoggedIn: false,
  username: undefined,
  name: undefined,
  image: undefined,
  password: undefined,
};

const authReducer = (state, action) => {
  if (action.type === "logout-success") {
    return defaultState;
  }
  return state;
};

export default authReducer;
