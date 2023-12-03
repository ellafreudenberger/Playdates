import React from "react";
import LoginForm from "../components/loginForm"

export const Login = () => {
    return (
    <div className="loginBorder">
    <h1 className="loginTitle">Book Playdates with us!</h1>
    <LoginForm />
    <div className="imageContainer">
    <img src="/images/CityStroll.jpeg"
        alt="City Dog Walk by Michael Külbel" //https://www.vecteezy.com/photo/24062390-city-stroll-with-canine-companion-a-woman-and-her-dog-amidst-skyscrapers-during-sunset-ai-generated
        className="loginImage"
      />
      <img src="/images/Dogs.jpg" 
      alt="Dogs Running by Kseniia Chunaeva" //https://www.vecteezy.com/photo/28715688-a-joyful-scene-of-puppies-frolicking-with-their-parent-dogs-spreading-laughter-and-happiness-in-the-park
      className="nextLoginImage"/>
      </div>
    </div>
    );
}

export default Login;

