import React from 'react';
import "../index.css";
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div> 
    <h1 className="companyTitle">Playdates</h1>
    <h1 className="homeMainTitle">Your Neighborhood Dog Sitters!</h1> 
    
    <h2 className="homeDescription"> Set your dog up on fun&nbsp;<span className="playdatesText">Playdates</span>&nbsp;with us! We offer services for local walks, sittings at your home and boardings at ours in the heart of the Upper East Side. We are dedicated to providing exceptional care and ensuring your pet's well-being and happiness. <Link to="/register">Register</Link> to book our services now, or if you would like to meet us before, contact us at our information below to schedule a consultation! </h2>
    <div className="homeServicesBorder">
    <h3 className="homeServices">Our Services</h3>
        <h4 className="homeTitle">Dog Walking</h4>
        <h5 className="homeInfo"> We have lived in NYC for 6 years and know the most picturesque and pet-friendly routes. Our walks will suit your dog's energy level and provide them with quality exercise and mental stimulation.</h5>
        <h4 className="homeTitle">Dog Sitting</h4>
        <h5 className="homeInfo">When you're away, you can trust us to be responsible in your home. We are able to maintain your dog's routine and continue to give them attention and supervision.</h5>
        <h4 className ="homeTitle">Boarding Services</h4>
        <h5 className="homeInfo">We offer a safe retreat where your dog will enjoy cozy accommodations, regular exercise and companionship in our welcoming home.</h5>
    </div>
    </div>
    );
}

export default Home;