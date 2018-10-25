import React from 'react';

export const EventModal = ({ targetEvent, handleFavoriteClick }) => {
  const { name, img, date, venue_name, favorite, address } = targetEvent;
  console.log(targetEvent);
  return (
    <div>
      <i
        className={favorite ? 'fas fa-star' : 'far fa-star'}
        onClick={handleFavoriteClick}
      />
      <h1>Event: {name}</h1>
      <h4>Date: {date}</h4>
      <img src={`${img}`} height={400} />
      <p>Location: {venue_name}</p>
      <p>Address: {address}</p>
    </div>
  );
};
