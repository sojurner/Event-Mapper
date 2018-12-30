import React from 'react';

import { Suggestions } from '../Suggestions/Suggestions';
import './Search.css';

export const Search = ({
  textContent,
  updateValue,
  handleKeyDown,
  suggestions,
  location,
  resetState,
  cursor
}) => {
  return (
    <div className="location-input-suggestions">
      <input
        className="location-input"
        type="text"
        placeholder="Search City"
        onChange={updateValue}
        onKeyDown={handleKeyDown}
        value={location}
      />
      <Suggestions
        textContent={textContent}
        suggestions={suggestions}
        cursor={cursor}
        location={location}
        resetState={resetState}
      />
    </div>
  );
};
