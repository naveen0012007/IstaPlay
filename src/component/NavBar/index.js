import React, { useEffect, useState } from "react";
import instaPlay from "../../assets/img/instaPlay.svg";
import "./NavBar.css";
import search from "../../assets/img/search.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  showSearch,
  valueFromInput,
  movieSearchDetails,
  setmovieSearchDetails,
  logOut,
}) => {
  const [valueInput, setValueInput] = useState(movieSearchDetails);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
    localStorage.clear();
  };
  useEffect(() => {
    // const savedItem = localStorage.getItem("data");
    // const parsedItem = JSON.parse(savedItem);
    // console.log(parsedItem);
    // setmovieSearchDetails(parsedItem);
  }, []);
  return (
    <div className="nav">
      <div className="navImageBox">
        <img
          onClick={() => handleClick()}
          style={{ cursor: "pointer" }}
          src={instaPlay}
          alt={"instaplay is not found"}
        ></img>
      </div>
      {showSearch && (
        <div className="navContainer">
          <div className="inputFieldBox">
            <input
              className="inputFieldValue"
              placeholder="Search movies"
              value={valueInput}
              // value="ave"
              onChange={(e) => {
                valueFromInput(e);
                setValueInput(e.target.value);
              }}
            ></input>
            <div className="searchImgBox">
              <img className="searchImg" src={search}></img>
            </div>
          </div>
          <Link to="/">
            <button className="navLogout" onClick={() => logOut()}>
              Logout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
