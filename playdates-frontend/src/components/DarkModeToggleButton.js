//https://www.youtube.com/watch?v=Uz35Qiia84g
import React from "react";
import {ReactComponent as Sun} from "../codedpictures/Moon.svg";
import {ReactComponent as Moon} from "../codedpictures/Sun.svg";
import "../DarkModeToggleButton.css"

const DarkModeToggle = () => {
  return (
    <div className='dark_mode'>
        <input
            className='dark_mode_input'
            type='checkbox'
            id='darkmode-toggle'
        />
        <label className='dark_mode_label' for='darkmode-toggle'>
            <Sun />
            <Moon />
        </label>
    </div>
);
};
export default DarkModeToggle;