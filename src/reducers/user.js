import { userConstants } from "../constants";

const initialState = {
  users: [],
  currentPage: 1,
  totalPages: 0,
  user: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_GET_ALL_SUCCESS:
    case userConstants.USER_FILTER_SUCCESS:
    case userConstants.USER_PAGINATE_SUCCESS:
      return {
        ...state,
        users: action.data,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        term: action.term,
        user: null
      };
    case userConstants.USER_GET_ONE_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    case userConstants.USER_CREATE_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.data],
        user: null
      };
    case userConstants.USER_UPDATE_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.hashed_id === action.data.hashed_id) {
            return action.data;
          }
          return user;
        })
      };
    case userConstants.USER_DELETE_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.hashed_id !== action.data.id),
        user: null
      };
    default:
      return state;
  }
};

export default user;