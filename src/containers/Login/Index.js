import Button from "../../component/Button";
import InputBox from "../../component/InputBox.js/index";
import Navbar from "../../component/NavBar";

import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./Login.css";

const Login = ({ logIn }) => {
  const initialValues = { username: "", password: "" };
  const [showSearch, setshowSearch] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isToken, setIsToken] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // setIsSubmit(true);
    checkToken();
    logIn();
  };

  useEffect(() => {
    console.log(
      "useEffect--------",
      { formErrors },
      Object.keys(formErrors).length
    );
    if (Object.keys(formErrors).length === 0) {
      getToken();
    }
  }, [formErrors]);

  // validation
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    }
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (!values.password.match(passw)) {
      errors.password =
        "Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
    }

    return errors;
  };

  // Api Call-----------------------------------------------------------------------------------------------
  const getToken = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=05097a4b5617debcdedd3ff7d7a01ee2"
    );
    const data = await res.json();
    setIsToken(data.request_token);
    localStorage.setItem("items", JSON.stringify(data.request_token));
  };

  //
  const checkToken = async () => {
    console.log({ formValues }, { isToken });
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=05097a4b5617debcdedd3ff7d7a01ee2",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formValues, request_token: isToken }),
      }
    );
    const data = await res.json();
    if (data.success) {
      navigate(`/movies`);
    }
  };

  return (
    <div>
      <Navbar showSearch={showSearch} />
      <div className="loginPage">
        <h1 className="signIn"> Sign in</h1>
        <p className="para">Sign in to your Self Service Portal</p>
        <form onSubmit={handleSubmit}>
          <div className="loginBox">
            <InputBox
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{formErrors.username}</p>

            <InputBox
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{formErrors.password}</p>
            <Button type="submit" />
            {/* <button type="submit" className="btn btnText" onClick={notify}>
              Notify!
            </button> */}
            <ToastContainer position="top-right" newestOnTop />
            <ToastContainer />
          </div>
        </form>
      </div>
      <Outlet />
    </div>
  );
};

export default Login;
