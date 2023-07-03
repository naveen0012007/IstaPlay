import { Navigate, Outlet, json } from "react-router-dom";
const Protected = ({ isLoggedIn }) => {
  console.log({ isLoggedIn });
  localStorage.setItem("logInOut", JSON.stringify(isLoggedIn));
  const item = localStorage.getItem("logInOut");
  console.log({ item });
  return item ? <Outlet /> : <Navigate to="/" replace />;
};
export default Protected;
