import { login } from "../../service/service";
import { userTypes } from "./constAction";

export const setUser = (user) => ({
  type: userTypes.Login,
  data: user,
});

export const loginSetUser = (user) => {
  return (dispatch) => {
    login(user)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
