import { authConstants } from "../constants";
import history from "../helpers/history";
import { authService } from "../services";

const signIn = ({ email, password }) => {

  const success = user => ({ type: authConstants.SIGN_IN_SUCCESS, user });
  const failure = error => ({ type: authConstants.SIGN_IN_FAILURE, error });

  return dispatch => {
    authService.signIn({ email, password })
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
        }
      )
  };
};

const signUp = user => {

  const success = user => ({ type: authConstants.SIGN_UP_SUCCESS, user });
  const failure = error => ({ type: authConstants.SIGN_UP_FAILURE, error });

  return dispatch => {
    authService.signUp(user)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
        }
      )
  };
};

const signOut = () => {
  authService.signOut();
  history.push('/');
  return { type: authConstants.SIGN_OUT };
};

export const authActions = {
  signIn,
  signUp,
  signOut
};