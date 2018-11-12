import React from 'react';
import './LoadingScreen.css';

export const LoadingScreen = ({ loading }) => {
  return (
    <img
      className="loading-homescreen"
      src={require(`../../images/loading.gif`)}
    />
  );
};
