//React
import React, { useEffect, useState } from "react";

//React-Router
import { useParams, useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Style
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useStyles } from "./Edit.style";
import Button from "@mui/material/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

//Const
import { updateFields } from "./constField";
import { edit } from "../../redux/actions/customerAction";

function Edit() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const customer = useSelector((state) =>
    state.customerReducer.customers?.arr?.find((x) => x.id === id)
  );
  const [editCustomer, setEditCustomer] = useState(customer);

  const numberPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const isPhoneMatch = (phone) => {
    if (numberPhone.test(phone)) return true;
    return false;
  };

  const validators = {
    email: [
      ["required", "isEmail"],
      ["שדה חובה", "מייל לא תקין"],
    ],
    phone: [
      ["required", "isPhoneMatch"],
      ["שדה חובה", "מספר לא תקין"],
    ],
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPhoneMatch", (phone) =>
      isPhoneMatch(phone)
    );
  }, []);

  const handleChange = (field, value) => {
    setEditCustomer({ ...editCustomer, [field]: value });
  };

  const handleSave = async () => {
    try {
      await dispatch(edit(editCustomer));
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    setEditCustomer({});
    navigate(-1);
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }} className={classes.root}>
        <span>פרטים:</span>
        <ValidatorForm onSubmit={handleSave}>
          {Object.keys(updateFields).map((key) =>
            !validators[key] ? (
              <TextField
                key={key}
                label={updateFields[key]}
                value={editCustomer && editCustomer[key] && editCustomer[key]}
                variant="outlined"
                className={classes.textField}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            ) : (
              <TextValidator
                key={key}
                className={classes.textField}
                margin="dense"
                label={updateFields[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                name="email"
                value={editCustomer && editCustomer[key] && editCustomer[key]}
                validators={validators[key][0]}
                errorMessages={validators[key][1]}
              />
            )
          )}
        </ValidatorForm>
        <div className={classes.wrapButton}>
          <Button
            variant="outlined"
            className={classes.back}
            onClick={handleBack}
          >
            חזרה
          </Button>
          <Button
            variant="contained"
            className={classes.save}
            onClick={handleSave}
          >
            שמירה
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Edit;
