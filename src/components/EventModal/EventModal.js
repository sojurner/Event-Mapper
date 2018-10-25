import React from 'react';

export const EventModal = ({ targetEvent, favoriteClick }) => {
  const { name, img, date, venues } = targetEvent;
  return (
    <div>
      <i className="fas fa-star" onClick={favoriteClick} />
      <h1>Event: {name}</h1>
      <h4>Date: {date}</h4>
      <img src={`${img}`} height={400} />
      <p>Location: {venues[0].name}</p>
      <p>Address: {venues[0].address}</p>
    </div>
  );
};
