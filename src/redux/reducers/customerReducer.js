import { customerTypes } from "../actions/constAction";

const initialState = {
  customers: [],
};

const customerReducer = (state = initialState.customers, action) => {
  switch (action.type) {
    case customerTypes.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.data,
      };
    case customerTypes.UPDATE_CUSTOMERS:
      const index = state.customers?.arr?.findIndex(
        (x) => x.id === action.data.id
      );
      const newArray = { arr: [] };
      newArray.arr = [...state.customers.arr];
      newArray.arr[index] = action.data;
      return {
        ...state,
        customers: newArray,
      };
    default:
      return state;
  }
};

export default customerReducer;
