import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    direction: "ltr !important",
  },
  row: {
    cursor: "pointer",
  },
  td: {
    textAlignLast: "center",
    height: "35px",
    border: "1px solid #ddd",
  },
  th: {
    border: "1px solid #ddd",
  },
  table: {
    width: "65%",
    margin: "auto",
    marginTop: "45px",
  },
  wrapFilter: {
    width: "65%",
    margin: "auto",
    marginTop: "35px",
  },
});
