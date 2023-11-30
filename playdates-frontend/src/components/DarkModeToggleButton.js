//https://www.youtube.com/watch?app=desktop&v=S-T9XoCMwt4

import React, { useState } from "react";
import SvgSleepingdog from "../icons/Sleepingdog";
import SvgLeapingdog from "../icons/Leapingdog.js";
import "../DarkModeToggleButton.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dark_mode ${darkMode ? 'dark_mode_active' : ''}`}>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        checked={darkMode}
        onChange={handleToggle}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <SvgSleepingdog />
        <SvgLeapingdog />
      </label>
      <div className="darkbackground"></div>
    </div>
  );
};

export default DarkModeToggle;

