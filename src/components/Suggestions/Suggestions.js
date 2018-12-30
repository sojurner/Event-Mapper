import React from 'react';

export const Suggestions = ({
  textContent,
  suggestions,
  location,
  cursor,
  resetState
}) => {
  return (
    <section ref={textContent} className={`suggestion-list`}>
      {suggestions.map((city, index) => {
        if (index < 7 && location.length > 1) {
          return (
            <p
              className={
                cursor === index + 1 ? 'active-suggestion' : 'suggestion'
              }
              key={`suggestions-${index}`}
              lng={city.lng}
              lat={city.lat}
              onClick={resetState.bind(null, city.lat, city.lng)}
            >
              {city.city}, {city.state_id}
            </p>
          );
        }
      })}
    </section>
  );
};
