/* eslint-disable react-hooks/exhaustive-deps */
//React
import React, { useEffect, useState } from "react";

//react-router
import { useNavigate } from "react-router-dom";

//Style
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStyles } from "./Login.style";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

//Redux
// import { loginSetUser } from "../../redux/actions/userAction";
import { login } from "../../service/service";
import { getCustomersByUser } from "../../redux/actions/customerAction";
import { useDispatch } from "react-redux";

function Login() {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const aaa = useSelector((state) => state.customerReducer.customer);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (
        value &&
        (!/[a-zA-Z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !specialChars.test(value))
      )
        return false;
      return true;
    });
  }, []);

  const changeField = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await login(user);
      navigate(`/home`);
      dispatch(getCustomersByUser());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ValidatorForm className={classes.root} onSubmit={handleSubmit}>
      <TextValidator
        className={classes.textField}
        margin="dense"
        label="מייל"
        onChange={(e) => changeField("email", e.target.value)}
        name="email"
        value={user.email}
        validators={["required", "isEmail"]}
        errorMessages={["שדה חובה", "מייל לא תקין"]}
      />
      <TextField
        className={classes.textField}
        label="שם פרטי"
        onChange={(e) => changeField("firstName", e.target.value)}
        name="firstName"
        value={user.firstName}
      />

      <TextField
        className={classes.textField}
        label="שם משפחה"
        onChange={(e) => changeField("lastName", e.target.value)}
        name="lastName"
        value={user.lastName}
      />

      <TextValidator
        className={classes.textField}
        label="סיסמא"
        margin="dense"
        onChange={(e) => changeField("password", e.target.value)}
        name="password"
        type="password"
        validators={["required", "isPasswordMatch"]}
        errorMessages={["שדה חובה", "חובה תווים מיוחדים מספרים ואותיות"]}
        value={user.password}
      />
      <Button className={classes.button} variant="outlined" type="submit">
        כניסה
      </Button>
    </ValidatorForm>
  );
}

export default Login;
