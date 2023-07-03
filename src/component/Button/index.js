import React from "react";
import "./Button.css";
const Button = ({ type }) => {
  return (
    <button className="btn btnText" type={type}>
      LOG IN
    </button>
  );
};

export default Button;
