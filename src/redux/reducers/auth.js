import * as dux from "../actionCreators/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: [],
};
const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dux.USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        errors: [],
      };
    case dux.REGISTER_SUCCESS:
    case dux.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        errors: [],
      };
    case dux.REGISTER_FAIL:
    case dux.LOGIN_FAIL:
      return {
        ...state,

        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: payload,
      };
    case dux.AUTH_ERROR:
    case dux.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: [],
      };

    default:
      return state;
  }
};

export default auth;
