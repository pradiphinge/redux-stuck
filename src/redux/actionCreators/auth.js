import api from "../../utils/api";
import * as action from "./actionTypes";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: action.USER_LOADED,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: action.AUTH_ERROR,
    });
  }
};

//Login user
export const login = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post("/auth", formData);
    console.log("res in login action", res);
    dispatch({
      type: action.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push("/userList");
  } catch (err) {
    console.log(err);
    dispatch({
      type: action.LOGIN_FAIL,
      payload: err.response.data.errors,
    });
  }
};

//Register User
export const register = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);
    dispatch({
      type: action.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push("/userList");
  } catch (err) {
    console.log(err);
    dispatch({
      type: action.REGISTER_FAIL,
      payload: err.response.data.errors,
    });
  }
};

export const logout = () => async (dispatch) =>
  dispatch({ type: action.LOGOUT });
