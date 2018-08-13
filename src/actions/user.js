import { userConstants } from "../constants";
import history from "../helpers/history";
import { userService } from "../services";

const getAll = ({ term = null, page = 1 }) => {
  const success = data => {
    data = { ...data, term, currentPage: page };
    return ({ type: userConstants.USER_GET_ALL_SUCCESS, ...data });
  };

  return dispatch => {
    userService.getAll({ term, page })
      .then(data => dispatch(success(data)));
  }
};

const getOne = (id) => {
  const success = data => ({ type: userConstants.USER_GET_ONE_SUCCESS, ...data });

  return dispatch => {
    userService.getOne(id)
      .then(data => dispatch(success(data)));
  }
};

const create = (user) => {
  const success = data => ({ type: userConstants.USER_CREATE_SUCCESS, ...data });

  return dispatch => {
    userService.create(user)
      .then(data => {
        dispatch(success(data));
        history.push('/users');
      });
  }
};

const update = (user) => {
  const success = data => ({ type: userConstants.USER_UPDATE_SUCCESS, ...data });

  return dispatch => {
    userService.update(user)
      .then(data => {
        dispatch(success(data));
        history.push('/users');
      });
  }
};

const remove = (id) => {
  const success = data => ({ type: userConstants.USER_DELETE_SUCCESS, ...data });

  return dispatch => {
    userService.remove(id)
      .then(data => dispatch(success(data)));
  }
};

export const userActions = {
  getAll,
  paginatedFilter: getAll,
  getOne,
  create,
  update,
  remove
};