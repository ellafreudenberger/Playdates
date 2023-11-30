//https://www.youtube.com/watch?v=Uz35Qiia84g
import React from "react";
import SvgSleepingdog from "../icons/Sleepingdog"
import SvgLeapingdog from "../icons/Leapingdog.js";
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
            <SvgSleepingdog />
            <SvgLeapingdog />
        </label>
    </div>
);
};
export default DarkModeToggle;