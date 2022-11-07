import { getCustomers, editCustomer } from "../../service/service";
import { customerTypes } from "./constAction";

export const setCustomer = (customers) => ({
  type: customerTypes.SET_CUSTOMERS,
  data: customers,
});

export const editCustomers = (customer) => ({
  type: customerTypes.UPDATE_CUSTOMERS,
  data: customer,
});

export const edit = (customer) => {
  return (dispatch) => {
    editCustomer(customer)
      .then(() => {
        dispatch(editCustomers(customer));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCustomersByUser = () => {
  return (dispatch) => {
    getCustomers()
      .then((data) => {
        dispatch(setCustomer(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
