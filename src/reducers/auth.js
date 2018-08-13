import { authConstants } from "../constants";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = { loggedIn: !!user, user };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.SIGN_IN_SUCCESS:
    case authConstants.SIGN_UP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authConstants.SIGN_IN_FAILURE:
    case authConstants.SIGN_UP_FAILURE:
    case authConstants.SIGN_OUT:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default auth;