import React from "react";

import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  button: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "montserrat",
  },
  buttonContainer: {
    textAlign: "right",
    paddingTop: "10px",
  },
});

const Pagination = ({ totalPages, handleClick }) => {
  const pages = [...Array(totalPages).keys()].map((number) => number + 1);
  const classes = styles();
  return (
    <div className={classes.buttonContainer}>
      {pages.map((number) => (
        <button className={classes.button} key={number} onClick={() => handleClick(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
