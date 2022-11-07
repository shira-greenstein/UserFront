import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "16px",
    marginTop: "14px",
  },
  textField: {
    width: "80%",
    margin: "13px !important",
    direction: "rtl",
  },
  wrapButton: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    margin: "14px",
  },
  save: {
    width: "60% !important",
  },
  back: {
    width: "36%",
  },
});
