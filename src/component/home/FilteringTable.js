import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useStyles } from "./Home.style";
// import SearchIcon from "@mui/icons-material/Search";

function FilteringTable({
  // preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };
  const classes = useStyles();
  return (
    <div className={classes.wrapFilter}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="פילטר"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          {/* <SearchIcon /> */}
        </IconButton>
      </Paper>
    </div>
  );
}

export default FilteringTable;
