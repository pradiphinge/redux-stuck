import * as dux from "../actionCreators/actionTypes";

const initialState = {
  loading: false,
  errors: [],
};
const referredUsers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dux.BYADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case dux.BYADMIN_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
};

export default referredUsers;
