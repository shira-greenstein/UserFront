import { userTypes } from "../actions/constAction";

const initialState = {
  user: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN:
      return { ...state, user: action };
    default:
      return state;
  }
}

export default userReducer;
