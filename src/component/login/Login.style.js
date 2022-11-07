import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "46px",
    "& div": {
      margin: "auto !important",
    },
  },
  textField: {
    margin: "auto !important",
    height: "71px",
  },
  textFieldValidator: {
    margin: "auto !important",
    // height: "71px",
  },
  button: {
    margin: "auto !important",
    color: "black !important",
    backgroundColor: "#cfcfcf !important",
  },
});
