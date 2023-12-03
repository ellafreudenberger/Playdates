import React from "react";
import AdminLoginForm from "../components/adminLogin"

export const AdminsLogin = () => {
    return (
      <div>  
        <h1 className="adminMainTitle">About Us</h1>
        <img
        src="/images/Lily.jpeg"
        alt="Lily"
        className="adminImage"
        style={{ width: "35%", height: "auto" }}
      />
      <img
        src="/images/Ella.jpeg"
        alt="Ella"
        className="adminImage"
        style={{ width: "38.8%", height: "auto" }}
      />
      <h3 className="adminImageDescription">Lily Hopkins & Ella Freudenberger</h3>
        <h2 className="adminTitle">Passionate Team</h2>
        <h3 className="adminDescription">We are natural-born dog lovers that have grown up training and raising dogs of our own. Our care is genuine and comes from personal experience.</h3>
        <h2 className="adminTitle">Personalized Services</h2>
        <h3 className="adminDescription">We understand that every dog has a personality. Our services are tailored to meet the individual needs of each pet and the preferences of every owner. We are happy to share photos and updates throughout our time together!</h3>
        <h2 className="adminTitle">Safety First</h2>
        <h3 className="adminDescription">Your pet's safety is our top priority! We maintain high standards of cleanliness, security and supervision.</h3>
       <AdminLoginForm/>
    </div>
    );
}

export default AdminsLogin;

