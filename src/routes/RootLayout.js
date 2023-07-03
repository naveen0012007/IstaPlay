import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../containers/Login/Index";
import Movies from "../containers/Movies/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RootLayout.css";
import MoviesDetails from "../containers/MoviesDetails";
import Protected from "../../src/utils/Protected";

const RootLayout = () => {
  // const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const logIn = () => {
    console.log("true------------------------");
    setisLoggedIn(true);
  };
  const logOut = () => {
    console.log("false------------------------");
    // setisLoggedIn(false);
    localStorage.setItem("logInOut", JSON.stringify(!isLoggedIn));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login logIn={logIn} />} exact />
        <Route element={<Protected isLoggedIn={isLoggedIn} />}>
          <Route path="/movies" element={<Movies logOut={logOut} />} />
          <Route path="/moviesDetails/:id" element={<MoviesDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootLayout;
