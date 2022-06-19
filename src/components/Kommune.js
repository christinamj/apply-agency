import React from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  tableElement: {
    fontSize: "12px",
    padding: "10px",
    width: "33.3%",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
});

const Kommune = (data) => {
  const classes = styles();

  return (
    <tr>
      <td className={classes.tableElement}>{data.data.kode}</td>
      <td className={classes.tableElement}>{data.data.navn}</td>
      <td className={classes.tableElement}>{data.data.region.navn}</td>
    </tr>
  );
};

export default Kommune;
