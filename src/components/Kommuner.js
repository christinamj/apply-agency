import React from "react";
// import { createUseStyles } from "react-jss";
import { ITEMS_PER_PAGE } from "../utils/constants";
import Kommune from "./Kommune";
import Map from "../components/Map";
import Pagination from "../components/Pagination";
import { createUseStyles } from "react-jss";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "@coreui/coreui/dist/css/coreui.min.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";
import { CCloseButton } from "@coreui/react";

const styles = createUseStyles({
  flexCenter: {
    position: "absolute",
    left: "50%",
    top: "44%",
    transform: "translate(-50%, -50%)",
  },

  tableElement: {
    fontSize: "12px",
    padding: "10px",
  },
  table: {
    textAlign: "left",
    width: "100%",
  },

  tableHeader: {
    padding: "10px",
    backgroundColor: "rgb(25, 50, 50);",
    color: "white",
    cursor: "pointer",
  },

  pages: {
    listStyle: "none",
    display: "flex",
  },
  introContainer: {
    fontFamily: "Montserrat",
    textAlign: "left",
    backgroundColor: "rgb(25, 50, 50)",
    color: "white",
    width: "100%",
  },

  introTxt: {
    maxWidth: "430px",
    fontSize: "12px",
    marginBottom: "25px",
  },

  header: {
    marginTop: "0",
  },

  btn: {
    backgroundColor: "white",
    border: "none",
    padding: "12px 22px 12px 22px",
    borderRadius: "38px",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const Kommuner = () => {
  function clickedButton() {
    setInteractive(true);
  }

  const handleClick = (number) => {
    setPage(number);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interactive, setInteractive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log(totalPages);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.dataforsyningen.dk/kommuner");
        setLoading(false);
        setData(res.data);
        setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE));
      } catch (error) {
        setError(error.message);
      }
    };
    fetchItems();
  }, []);

  function sortName() {
    let sortedData = [...data].sort((a, b) => a.navn.localeCompare(b.navn));

    setData(sortedData);
    setInteractive(true);
  }

  function sortRegion() {
    let sortedData = [...data].sort((a, b) => a.region.navn.localeCompare(b.region.navn));

    setData(sortedData);
    setInteractive(true);
  }
  function sortCode() {
    let sortedData = [...data].sort(function (a, b) {
      return a.kode - b.kode;
    });

    setData(sortedData);
    setInteractive(true);
  }
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const selectedUsers = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const classes = styles();
  if (interactive === false)
    return (
      <div className={classes.introContainer}>
        <div className="introTxtWrap">
          <h1 className={classes.header}>Kommuner</h1>
          <p className={classes.introTxt}>
            Danmarks Kommuner bla bla bla. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className={classes.btn} onClick={clickedButton}>
            Se kommuner
          </button>
        </div>
      </div>
    );
  if (loading)
    return (
      <div className={classes.flexCenter}>
        <ThreeDots color="#D3D3D3" height={80} width={80} />
      </div>
    );
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (data)
    return (
      <div className="interactive-container">
        <div className="close">
          <CCloseButton onClick={() => setInteractive(false)}></CCloseButton>
        </div>
        <table className={classes.table}>
          <tbody className="fontRegular">
            <tr>
              <th onClick={sortCode} className={classes.tableHeader}>
                Kommunekode
              </th>
              <th onClick={sortName} className={classes.tableHeader}>
                Kommune
              </th>
              <th onClick={sortRegion} className={classes.tableHeader}>
                Region
              </th>
            </tr>
            {selectedUsers.map((data) => (
              <Kommune data={data} key={data.dagi_id} />
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} handleClick={handleClick}></Pagination>
        <div className="map-wrapper">
          <Map data={data}></Map>
        </div>
      </div>
    );
};
