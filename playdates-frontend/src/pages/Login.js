import React from "react";
import LoginForm from "../components/loginForm";
import Slideshow from "../components/slideshow";
import "../index.css";

export const Login = () => {
  return (
    <div className="loginContainer">
      <h1 className="loginTitle">
        Book&nbsp;
        <span className="playdatesText">Playdates</span>
        &nbsp;with us!
      </h1>
      <LoginForm />
      <Slideshow />
    </div>
  );
};

export default Login;