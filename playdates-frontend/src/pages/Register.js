import React from "react";
import RegistrationForm from "../components/registrationForm";
import "../index.css"

const Register = () => {
    return (
    <div className="registerBackground"> 
    <h1 className="registerTitle">Register Here:</h1>
    <RegistrationForm />
    </div>
    );
}

export default Register;