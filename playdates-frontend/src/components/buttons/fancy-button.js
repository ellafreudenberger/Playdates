//https://codepen.io/jscottsmith/pen/ONjPzM/

import React from 'react';
import '../buttons/fancy-button.css';

const FancyButton = ({ onClick, width, height, fontSize, color, borderWidth, buttonText }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(); // Call the provided onClick function
  };

  const maskId = 'mask_1';
  const maskStyle =
    '#fancy-masked-element_' +
    maskId +
    ' { mask: url(#' +
    maskId +
    '); -webkit-mask: url(#' +
    maskId +
    ')}';

  const buttonStyle = {
    width: width,
    height: height,
    marginTop: '15%',
  };

  const fancyFrontStyle = {
    transform: 'rotateX(0deg) translateZ(' + height / 2 + 'px )',
  };

  const fancyBackStyle = {
    transform: 'rotateX(90deg) translateZ( ' + height / 2 + 'px )',
  };

  const textTransform =
    'matrix(1 0 0 1 ' + width / 2 + ' ' + height / 1.6 + ')';
  const viewBox = '0 0 ' + width + ' ' + height;

  return (
    <div className="fancy-button" style={buttonStyle} onClick={handleClick}>
      <div className="fancy-flipper">
        <div className="fancy-front" style={fancyFrontStyle}>
          <svg height={height} width={width} viewBox={viewBox}>
            <defs>
              <mask id={maskId}>
                <rect width="100%" height="100%" fill="#FFFFFF" />
                <text
                  className="mask-text button-text"
                  fill="#000000"
                  transform={textTransform}
                  fontFamily="'intro_regular'"
                  fontSize={fontSize}
                  width="100%"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  {buttonText}
                </text>
              </mask>
            </defs>
            <style>{maskStyle}</style>
            <rect
              id={'fancy-masked-element_' + maskId}
              fill={color}
              width="100%"
              height="100%"
            />
          </svg>
        </div>
        <div className="fancy-back" style={fancyBackStyle}>
          <svg height={height} width={width} viewBox={viewBox}>
            <rect
              stroke={color}
              strokeWidth={borderWidth}
              fill="transparent"
              width="100%"
              height="100%"
            />
            <text
              className="button-text"
              transform={textTransform}
              fill={color}
              fontFamily="'intro_regular'"
              fontSize={fontSize}
              textAnchor="middle"
              letterSpacing="1"
            >
              {buttonText}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

FancyButton.defaultProps = {
  color: '#FFFFFF',
  width: 300,
  height: 90,
  fontSize: 36,
  borderWidth: 13,
  buttonText: 'LOGIN',
};

export default FancyButton;
