/* eslint-disable react-hooks/exhaustive-deps */
//React
import React, { useEffect, useMemo } from "react";

//Redux
import { useSelector } from "react-redux";

//react-router
import { useNavigate } from "react-router-dom";

//react-table
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { columns } from "./columns";

//Component
import FilteringTable from "./FilteringTable";

//Style
import { useStyles } from "./Home.style";

function Home() {
  const classes = useStyles();

  const columnsOfTable = useMemo(() => columns, []);
  const customers = useSelector(
    (state) => state.customerReducer?.customers?.arr
  );
  const dataOfTable = useMemo(() => customers, [customers]);
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns: columnsOfTable || [],
      data: dataOfTable || [],
    },
    useFilters,
    useGlobalFilter
  );

  const handleRowClick = (row) => {
    navigate(`/edit/${row.id}`);
  };

  return (
    <>
      <FilteringTable
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className={classes.root}>
        <table {...getTableProps()} className={classes.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className={classes.th}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className={classes.row}
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className={classes.td}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
