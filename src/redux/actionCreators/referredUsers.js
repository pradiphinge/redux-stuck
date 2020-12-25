import api from "../../utils/api";
import * as action from "./actionTypes";
import { toast } from "react-toastify";

export const referRegister = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);
    console.log("registration response==>", res);
    dispatch({
      type: action.BYADMIN_REGISTER_SUCCESS,
      payload: res.data,
    });

    toast.success("user registered successfully");
  } catch (err) {
    console.log("errror IN REGISTRATION", err);
    dispatch({
      type: action.BYADMIN_REGISTER_FAIL,
      payload: err.response.data.errors,
    });
    toast.error("user registration failed");
  }
};
