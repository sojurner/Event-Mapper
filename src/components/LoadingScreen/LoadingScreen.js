import React from 'react';
import './LoadingScreen.css';

export const LoadingScreen = () => {
  return (
    <div className="giphy-embed">
      <img
        src={require(`../../images/loader.gif`)}
        className="giphy-img"
        height="100"
        width="100"
      />
    </div>
  );
};
