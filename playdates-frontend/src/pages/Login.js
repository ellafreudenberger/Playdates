import React from "react";
import LoginForm from "../components/loginForm";
import Slideshow from "../components/slideshow";
import "../index.css";

export const Login = () => {
  return (
    <div>
      <h1 className="loginTitle">
        Book Playdates with us!
      </h1>
      <div className="loginContainer">
      <LoginForm />
      <Slideshow />
      </div>
    </div>
  );
};

export default Login;